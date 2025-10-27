import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import type { ApiRequestError } from './models';

export type ProgressCallback = (progress: number) => void;

export interface ProgressOptions {
  minimumDelay?: number;
  steps?: number[];
  onDownloadProgress?: ProgressCallback;
  onUploadProgress?: ProgressCallback;
}


export type * from 'axios';

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  payload: Record<symbol, unknown>;
}

export type ApiResponse<T extends Record<string, unknown>> = {
  data?: T;
  error?: ApiErrorResponse;
  isLoading: boolean;
};

export interface AxiosDataState<T extends Record<string, unknown>> {
  data: T | undefined;
  error: ApiRequestError | undefined;
  isLoading: boolean;
  progress: number;
  resetState: () => void;
}

export type AxiosRequestFunction<T, K = undefined> = (
  options: AxiosRequestConfig<K extends undefined ? T : K>,
) => Promise<void>;

export type AxiosNodeFunction<T, K = undefined> = (
  options: AxiosRequestConfig<K extends undefined ? T : K>,
) => Promise<K extends undefined ? T : K>;

export type UseAxiosParameters<T, K = undefined> = {
  axiosInstance: AxiosInstance;
  options?: {
    deserializer?: (response: AxiosResponse<T>) => K extends undefined ? T : K;
  };
};
