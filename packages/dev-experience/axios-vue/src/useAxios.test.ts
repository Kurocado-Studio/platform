import {
  createAxiosInstance,
  modelAxiosDataResponse,
} from '@kurocado-studio/axios-domain';
import type { UseAxiosParameters } from '@kurocado-studio/axios-domain';
import type { AxiosInstance } from 'axios';
import type { Mock } from 'vitest';

import { useAxios } from './useAxios';

export const mockAxiosInstance = vi.fn() as unknown as Mock<AxiosInstance> &
  ReturnType<typeof createAxiosInstance>;

vi.mock('@kurocado-studio/axios-domain', async () => {
  const actual = await vi.importActual('@kurocado-studio/axios-domain');

  return {
    ...actual,
    modelAxiosDataResponse: vi.fn(),
    attachProgressToInstance: vi.fn((instance) => instance), // return untouched instance
    ApiRequestError: {
      create: vi.fn(
        (error) => new Error(`Wrapped: ${(error as Error).message}`),
      ),
    },
  };
});

describe('useAxios (Vue)', () => {
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

    const { state, requestHandler } = useAxios(payload);

    await requestHandler(config);

    expect(state.data.value).toEqual(result);
    expect(state.isLoading.value).toBe(false);
    expect(state.error.value).toBeUndefined();
  });

  it('should set error when modelAxiosDataResponse throws', async () => {
    const error = new Error('Server failed');
    (
      modelAxiosDataResponse as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValue(error);

    const payload: UseAxiosParameters<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const { state, requestHandler } = useAxios(payload);

    await requestHandler(config);

    expect(state.data.value).toBeUndefined();
    expect(state.isLoading.value).toBe(false);
    expect(state.error.value?.message).toBe('Wrapped: Server failed');
  });

  it('should reset state', async () => {
    const result = { message: 'done' };
    (
      modelAxiosDataResponse as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue(result);

    const payload: UseAxiosParameters<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const { state, requestHandler } = useAxios(payload);
    await requestHandler(config);

    expect(state.data.value).toEqual(result);

    state.resetState();

    expect(state.data.value).toBeUndefined();
    expect(state.error.value).toBeUndefined();
    expect(state.isLoading.value).toBe(false);
  });
});
