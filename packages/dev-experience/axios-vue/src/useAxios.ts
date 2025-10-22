/* eslint import/named: "off" */
import {
  ApiRequestError,
  type AxiosRequestFunction,
  type UseAxiosParameters,
  modelAxiosDataResponse,
} from '@kurocado-studio/axios-domain';
import { set } from 'lodash-es';
import { type Ref, ref } from 'vue';

type StateReferences<T extends Record<string, unknown>> = {
  data: Ref<T | undefined>;
  error: Ref<ApiRequestError | undefined>;
  isLoading: Ref<boolean>;
  resetState: () => void;
};

export function useAxios<
  T extends Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
>(
  payload: UseAxiosParameters<T, K>,
): {
  state: StateReferences<K extends undefined ? T : K>;
  requestHandler: AxiosRequestFunction<T, K>;
} {
  const data: Ref<(K extends undefined ? T : K) | undefined> = ref(undefined);
  const error: Ref<ApiRequestError | undefined> = ref(undefined);
  const isLoading: Ref<boolean> = ref(false);

  const resetState = (): void => {
    isLoading.value = false;
    data.value = undefined;
    error.value = undefined;
  };

  const requestHandler: AxiosRequestFunction<T, K> = async (config) => {
    try {
      isLoading.value = true;
      error.value = undefined;

      data.value = await modelAxiosDataResponse<T, K>(payload, config);
    } catch (requestError: unknown) {
      set(error, ['value'], ApiRequestError.create(requestError));
    } finally {
      isLoading.value = false;
    }
  };

  return {
    state: { data, error, isLoading, resetState },
    requestHandler,
  };
}
