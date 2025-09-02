import type {
  AxiosNodeFunction,
  UseAxiosParameters,
} from '@kurocado-studio/axios-client-domain';
import {
  ApiRequestError,
  modelAxiosDataResponse,
} from '@kurocado-studio/axios-client-domain';

export function axiosNodeAdapter<
  T extends Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
>(payload: UseAxiosParameters<T, K>): AxiosNodeFunction<T, K> {
  return async (config) => {
    try {
      return modelAxiosDataResponse<T, K>(payload, config);
    } catch (error: unknown) {
      throw ApiRequestError.create(error);
    }
  };
}
