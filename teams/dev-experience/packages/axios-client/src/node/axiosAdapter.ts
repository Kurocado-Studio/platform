import type { AxiosNodeFunction, UseAxiosParams } from '../domain';
import { ApiRequestError, modelAxiosDataResponse } from '../domain';

export function createAxiosNodeAdapter<
  T extends Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
>(payload: UseAxiosParams<T, K>): AxiosNodeFunction<T, K> {
  return async (config) => {
    try {
      return modelAxiosDataResponse<T, K>(payload, config);
    } catch (e: unknown) {
      throw ApiRequestError.create(e);
    }
  };
}
