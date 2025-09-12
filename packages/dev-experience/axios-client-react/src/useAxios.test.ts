import {
  createAxiosInstance,
  modelAxiosDataResponse,
} from '@kurocado-studio/axios-client-domain';
import type { UseAxiosParameters } from '@kurocado-studio/axios-client-domain';
import { act, renderHook, waitFor } from '@kurocado-studio/qa/web';
import type { AxiosInstance } from 'axios';
import { type Mock } from 'vitest';

import { useAxios } from './useAxios';

export const mockAxiosInstance = vi.fn() as unknown as Mock<AxiosInstance> &
  ReturnType<typeof createAxiosInstance>;

vi.mock('@kurocado-studio/axios-client-domain', async () => {
  const actual = await vi.importActual('@kurocado-studio/axios-client-domain');

  return {
    ...actual,
    modelAxiosDataResponse: vi.fn(),
    ApiRequestError: {
      create: vi.fn(
        (error) => new Error(`Wrapped: ${(error as Error).message}`),
      ),
    },
  };
});

describe('useAxios (React)', () => {
  type RawResponse = { message: string };

  const config = { url: '/example', method: 'GET' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update state with deserialized data on success', async () => {
    const result = { message: 'success' };
    (
      modelAxiosDataResponse as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue(result);

    const payload: UseAxiosParameters<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const { result: hookResult } = renderHook(() => useAxios(payload));
    const [, request] = hookResult.current;

    act(() => {
      request(config);
    });

    await waitFor(() => {
      expect(hookResult.current[0].isLoading).toBe(false);
    });

    expect(hookResult.current[0].data).toEqual(result);
    expect(hookResult.current[0].isLoading).toBe(false);
    expect(hookResult.current[0].error).toBeUndefined();
  });

  it('should set error when modelAxiosDataResponse throws', async () => {
    const error = new Error('Server failed');
    (
      modelAxiosDataResponse as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValue(error);

    const payload: UseAxiosParameters<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const { result: hookResult } = renderHook(() => useAxios(payload));
    const [, request] = hookResult.current;

    act(() => {
      request(config);
    });

    await waitFor(() => {
      expect(hookResult.current[0].isLoading).toBe(false);
    });

    expect(hookResult.current[0].data).toBeUndefined();
    expect(hookResult.current[0].isLoading).toBe(false);
    expect(hookResult.current[0].error?.message).toBe('Wrapped: Server failed');
  });

  it('should reset state', async () => {
    const result = { message: 'done' };
    (
      modelAxiosDataResponse as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue(result);

    const payload: UseAxiosParameters<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const { result: hookResult } = renderHook(() => useAxios(payload));
    const [, request] = hookResult.current;

    act(() => {
      request(config);
    });

    await waitFor(() => {
      expect(hookResult.current[0].data).toEqual(result);
    });

    expect(hookResult.current[0].data).toEqual(result);

    act(() => {
      hookResult.current[0].resetState();
    });

    expect(hookResult.current[0].data).toBeUndefined();
    expect(hookResult.current[0].error).toBeUndefined();
    expect(hookResult.current[0].isLoading).toBe(false);
  });
});
