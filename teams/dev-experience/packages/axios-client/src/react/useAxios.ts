import * as React from 'react';

import {
  ApiRequestError,
  type AxiosDataState,
  type AxiosRequestFunction,
  type UseAxiosParams,
  modelAxiosDataResponse,
} from '../domain';

type UseAxios = <
  T extends Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
>(
  options: UseAxiosParams<T, K>,
) => [AxiosDataState<K extends undefined ? T : K>, AxiosRequestFunction<T, K>];

export const useAxios: UseAxios = <
  T extends Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
>(
  payload: UseAxiosParams<T, K>,
) => {
  const [data, setData] = React.useState<
    (K extends undefined ? T : K) | undefined
  >(undefined);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<undefined | ApiRequestError>(
    undefined,
  );

  const resetState: () => void = React.useCallback(() => {
    setIsLoading(false);
    setData(undefined);
    setError(undefined);
  }, []);

  const axiosRequest: AxiosRequestFunction<T, K> = React.useCallback(
    async (config) => {
      try {
        setIsLoading(true);
        setError(undefined);

        const deserializedData = await modelAxiosDataResponse<T, K>(
          payload,
          config,
        );

        setData(deserializedData);
      } catch (e: unknown) {
        setError(ApiRequestError.create(e));
      } finally {
        setIsLoading(false);
      }
    },
    [payload],
  );

  const memoizedState = React.useMemo(() => {
    return {
      data,
      error,
      isLoading,
      resetState,
    };
  }, [data, error, isLoading, resetState]);

  React.useEffect(() => {
    return () => resetState();
  }, [resetState]);

  return [memoizedState, axiosRequest];
};
