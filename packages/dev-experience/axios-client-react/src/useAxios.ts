import {
  ApiRequestError,
  type AxiosDataState,
  type AxiosRequestFunction,
  type UseAxiosParameters,
  modelAxiosDataResponse,
} from '@kurocado-studio/axios-client-domain';
import * as React from 'react';

export type AxiosHandler<
  T extends Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
> = (
  ...axiosRequestConfig: Parameters<AxiosRequestFunction<T, K>>
) => Promise<K extends undefined ? T : K>;

export type UseAxios = <
  T extends Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
>(
  options: UseAxiosParameters<T, K>,
) => [AxiosDataState<K extends undefined ? T : K>, AxiosHandler<T, K>];

export const useAxios: UseAxios = <
  T extends Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
>(
  payload: UseAxiosParameters<T, K>,
) => {
  const [data, setData] = React.useState<
    (K extends undefined ? T : K) | undefined
  >();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<undefined | ApiRequestError>();

  const resetState: () => void = React.useCallback(() => {
    setIsLoading(false);
    setData(undefined);
    setError(undefined);
  }, []);

  const axiosRequest: AxiosHandler<T, K> = React.useCallback(
    async (...parameters) => {
      const [config] = parameters;

      try {
        setIsLoading(true);
        setError(undefined);

        const deserializedData = await modelAxiosDataResponse<T, K>(
          payload,
          config,
        );

        setData(deserializedData);

        return deserializedData;
      } catch (error: unknown) {
        setError(ApiRequestError.create(error));
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
