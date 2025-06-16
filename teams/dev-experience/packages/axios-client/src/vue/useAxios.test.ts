/* eslint-disable import/order */
/**
 * TODO: fix mismatch between ESLint sort order still
 */
import { modelAxiosDataResponse } from '../domain';
import type { UseAxiosParams } from '../domain';
import { mockAxiosInstance } from '../domain/utils/mocks';
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

    const payload: UseAxiosParams<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const { state, request } = useAxios(payload);

    await request(config);

    expect(state.data.value).toEqual(result);
    expect(state.isLoading.value).toBe(false);
    expect(state.error.value).toBeUndefined();
  });

  it('should set error when modelAxiosDataResponse throws', async () => {
    const error = new Error('Server failed');
    (
      modelAxiosDataResponse as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValue(error);

    const payload: UseAxiosParams<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const { state, request } = useAxios(payload);

    await request(config);

    expect(state.data.value).toBeUndefined();
    expect(state.isLoading.value).toBe(false);
    expect(state.error.value?.message).toBe('Wrapped: Server failed');
  });

  it('should reset state', async () => {
    const result = { message: 'done' };
    (
      modelAxiosDataResponse as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue(result);

    const payload: UseAxiosParams<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const { state, request } = useAxios(payload);
    await request(config);

    expect(state.data.value).toEqual(result);

    state.resetState();

    expect(state.data.value).toBeUndefined();
    expect(state.error.value).toBeUndefined();
    expect(state.isLoading.value).toBe(false);
  });
});
