import {
  ApiRequestError,
  type AxiosDataState as MainAxiosDataState,
  type AxiosRequestFunction as MainAxiosRequestFunction,
  type UseAxiosParameters as MainUseAxiosParameters,
  PROGRESS_STEP_MAPS,
  attachProgressToInstance,
  modelAxiosDataResponse,
} from '@kurocado-studio/axios-domain';
import * as React from 'react';

export type AxiosState<T extends Record<string, unknown>> =
  MainAxiosDataState<T>;

export type UseAxiosParameters<
  T extends Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
> = MainUseAxiosParameters<T, K>;

export type AxiosRequestFunction<
  T extends Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
> = MainAxiosRequestFunction<T, K>;

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
) => [AxiosState<K extends undefined ? T : K>, AxiosHandler<T, K>];

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
  const [progress, setProgress] = React.useState<number>(0);
  const [error, setError] = React.useState<undefined | ApiRequestError>();

  const resetState: () => void = React.useCallback(() => {
    setIsLoading(false);
    setProgress(0);
    setData(undefined);
    setError(undefined);
  }, []);

  const axiosRequest: AxiosHandler<T, K> = React.useCallback(
    async (...parameters) => {
      const [config] = parameters;

      try {
        setIsLoading(true);
        setError(undefined);

        const axiosWithProgressInstance = attachProgressToInstance(
          payload.axiosInstance,
          {
            steps: PROGRESS_STEP_MAPS.mixed,
            minimumDelay: 500,
            onDownloadProgress: setProgress,
          },
        );

        const modeledData = await modelAxiosDataResponse<T, K>(
          { ...payload, axiosInstance: axiosWithProgressInstance },
          config,
        );

        setData(modeledData);

        return modeledData;
      } catch (error: unknown) {
        setError(ApiRequestError.create(error));
      } finally {
        setIsLoading(false);
      }
    },
    [payload],
  );
  const memoizedState = {
    data,
    error,
    isLoading,
    progress,
    resetState,
  };

  React.useEffect(() => {
    return () => resetState();
  }, [resetState]);

  return [memoizedState, axiosRequest];
};
