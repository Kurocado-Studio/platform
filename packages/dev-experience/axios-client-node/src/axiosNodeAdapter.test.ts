/**
 * TODO: fix mismatch between ESLint sort order still
 */
import type { UseAxiosParameters } from '@kurocado-studio/axios-client-domain';
import {
  mockAxiosInstance,
  modelAxiosDataResponse,
} from '@kurocado-studio/axios-client-domain';
import { describe, expect, it, vi } from 'vitest';

import { axiosNodeAdapter } from './axiosNodeAdapter';

vi.mock('@kurocado-studio/axios-client-domain', async (importOriginal) => {
  const actual: Record<string, unknown> = await importOriginal();
  const domain = vi.importActual('@kurocado-studio/axios-client-domain');

  return {
    ...domain,
    ...actual,
    modelAxiosDataResponse: vi.fn(),
    ApiRequestError: {
      create: vi.fn(
        (error) => new Error(`Wrapped: ${(error as Error).message}`),
      ),
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

    const payload: UseAxiosParameters<RawResponse> = {
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

    const payload: UseAxiosParameters<RawResponse> = {
      axiosInstance: mockAxiosInstance,
    };

    const adapter = axiosNodeAdapter(payload);

    await expect(adapter(config)).rejects.toThrow(
      'Wrapped Locally: Network down',
    );
  });
});
