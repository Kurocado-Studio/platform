import axios, { type AxiosInstance } from 'axios';
import { describe, expect, it, vi } from 'vitest';

import { attachProgressToInstance } from './attachProgressToInstance';
import { type ProgressOptions } from './types';

const createMockInstance = (): AxiosInstance => {
  const instance = axios.create();
  instance.interceptors.request.use = vi.fn();
  instance.interceptors.response.use = vi.fn();
  instance.request = vi.fn();

  return instance;
};

describe('attachProgressToInstance', () => {
  it('should attach interceptors to the Axios instance', () => {
    const instance = createMockInstance();
    attachProgressToInstance(instance);

    expect(instance.interceptors.request.use).toHaveBeenCalledTimes(1);
    expect(instance.interceptors.response.use).toHaveBeenCalledTimes(1);
  });

  it('should clear simulation when response is completed', async () => {
    const instance = createMockInstance();
    const onDownloadProgress = vi.fn();
    const progressOptions: ProgressOptions = {
      onDownloadProgress,
      minimumDelay: 100,
    };

    attachProgressToInstance(instance, progressOptions);

    // Mock the response interceptor
    const responseInterceptor =
      instance.interceptors.response.use.mock.calls[0][0];

    // Call the response interceptor with a mock response
    await responseInterceptor({ data: {} });

    // Wait for async operations to complete
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(onDownloadProgress).toHaveBeenCalledWith(100);
  });

  it('should reject and clear simulation on error', async () => {
    const instance = createMockInstance();
    const onDownloadProgress = vi.fn();
    const progressOptions: ProgressOptions = {
      onDownloadProgress,
    };

    attachProgressToInstance(instance, progressOptions);

    // Get the error handler from response interceptors
    const errorHandler = instance.interceptors.response.use.mock.calls[0][1];

    const error = new Error('Request failed');
    try {
      await errorHandler(error);
    } catch (error_) {
      expect(error_).toBe(error);
    }

    expect(onDownloadProgress).not.toHaveBeenCalledWith(100);
  });
});
