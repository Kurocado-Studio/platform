/* eslint-disable import/order */
/**
 * TODO: fix mismatch between ESLint sort order still
 */
import { act, renderHook, waitFor } from '@kurocado-studio/qa/web';

import { modelAxiosDataResponse } from '@kurocado-studio/axios-client-domain';
import type { UseAxiosParams } from '@kurocado-studio/axios-client-domain';
import { mockAxiosInstance } from '@kurocado-studio/axios-client-domain';
import { useAxios } from './useAxios';

vi.mock('../domain', async () => {
  const actual = await vi.importActual('../domain');

  return {
    ...actual,
    modelAxiosDataResponse: vi.fn(),
    ApiRequestError: {
      create: vi.fn((e) => new Error(`Wrapped: ${(e as Error).message}`)),
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

    const payload: UseAxiosParams<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const { result: hookResult } = renderHook(() => useAxios(payload));
    const [_, request] = hookResult.current;

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

    const payload: UseAxiosParams<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const { result: hookResult } = renderHook(() => useAxios(payload));
    const [_, request] = hookResult.current;

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

    const payload: UseAxiosParams<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const { result: hookResult } = renderHook(() => useAxios(payload));
    const [_, request] = hookResult.current;

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
