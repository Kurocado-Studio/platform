import type { AxiosRequestConfig } from 'axios';
import { get } from 'lodash-es';

import type { UseAxiosParameters } from './types';

export async function modelAxiosDataResponse<
  T extends Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
>(
  payload: UseAxiosParameters<T, K>,
  config: AxiosRequestConfig<K extends undefined ? T : K>,
): Promise<K extends undefined ? T : K> {
  const response = await payload.axiosInstance(config);
  const deserializer = get(payload, ['options', 'deserializer']);
  return deserializer?.(response) ?? response.data;
}
