/* eslint-disable import/order */
/**
 * TODO: fix mismatch between ESLint sort order still
 */
import { describe, expect, it, vi } from 'vitest';

import type { UseAxiosParams } from '../../../../../domains/dev-experience/domain';
import { modelAxiosDataResponse } from '../../../../../domains/dev-experience/domain';
import { mockAxiosInstance } from '../../../../../domains/dev-experience/domain/utils/mocks';
import { axiosNodeAdapter } from './axiosNodeAdapter';

vi.mock('../domain', () => {
  const domain = vi.importActual('../domain');

  return {
    ...domain,
    modelAxiosDataResponse: vi.fn(),
    ApiRequestError: {
      create: vi.fn((e) => new Error(`Wrapped: ${(e as Error).message}`)),
    },
  };
});

describe('axiosNodeAdapter', () => {
  type RawResponse = { message: string };

  const config = { url: '/test', method: 'GET' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the result of modelAxiosDataResponse on success', async () => {
    const result = { message: 'Hello' };
    (
      modelAxiosDataResponse as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue(result);

    const payload: UseAxiosParams<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const adapter = axiosNodeAdapter(payload);
    const response = await adapter(config);

    expect(modelAxiosDataResponse).toHaveBeenCalledWith(payload, config);
    expect(response).toEqual(result);
  });

  it('should wrap errors', async () => {
    const error = new Error('Wrapped Locally: Network down');
    (
      modelAxiosDataResponse as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValue(error);

    const payload: UseAxiosParams<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const adapter = axiosNodeAdapter(payload);

    await expect(adapter(config)).rejects.toThrow(
      'Wrapped Locally: Network down',
    );
  });
});
