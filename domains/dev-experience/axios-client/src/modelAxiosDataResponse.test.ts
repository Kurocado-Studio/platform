import type {
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { modelAxiosDataResponse } from './modelAxiosDataResponse';
import type { UseAxiosParameters } from './types';
import { mockAxiosInstance } from './utils/mocks';

describe('modelAxiosDataResponse', () => {
  type RawResponse = { id: string; name: string };
  type TransformedResponse = { displayName: string };

  const config: InternalAxiosRequestConfig = {
    url: '/example',
    method: 'GET',
    headers: {} as AxiosRequestHeaders,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return raw response data when no deserializer is provided', async () => {
    const payload: UseAxiosParameters<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const mockResponse: AxiosResponse<RawResponse> = {
      data: { id: '123', name: 'Test' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };

    mockAxiosInstance.mockResolvedValueOnce(mockResponse);

    const result = await modelAxiosDataResponse(payload, config);
    expect(result).toEqual({ id: '123', name: 'Test' });
  });

  it('should return deserialized data when deserializer is provided', async () => {
    const payload: UseAxiosParameters<RawResponse, TransformedResponse> = {
      axiosInstance: mockAxiosInstance,
      options: {
        deserializer: (response) => ({
          displayName: `${response.data.name}#${response.data.id}`,
        }),
      },
    };

    const mockResponse: AxiosResponse<RawResponse> = {
      data: { id: '123', name: 'Test' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };

    mockAxiosInstance.mockResolvedValueOnce(mockResponse);

    const result = await modelAxiosDataResponse(payload, config);
    expect(result).toEqual({ displayName: 'Test#123' });
  });

  it('should propagate errors thrown by the axiosInstance', async () => {
    const payload: UseAxiosParameters<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const error = new Error('Network error');
    mockAxiosInstance.mockRejectedValueOnce(error);

    await expect(modelAxiosDataResponse(payload, config)).rejects.toThrow(
      'Network error',
    );
  });
});
