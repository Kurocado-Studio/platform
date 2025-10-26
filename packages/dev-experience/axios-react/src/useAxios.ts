import {
    ApiRequestError,
    type AxiosDataState as MainAxiosDataState,
    type AxiosRequestFunction as MainAxiosRequestFunction,
    type UseAxiosParameters as MainUseAxiosParameters,
    modelAxiosDataResponse,
} from '@kurocado-studio/axios-domain';
import * as React from 'react';

export type AxiosState<T extends Record<string, unknown>> =
    MainAxiosDataState<T> & {
    progress: number;
};

export type ProgressOptions = {
    minDelay?: number; // Minimum duration in ms to display progress
    steps?: number[]; // Array of progress steps (0-100)
};

export type UseAxiosParameters<T extends Record<string, unknown>,
    K extends Record<string, unknown> | undefined = undefined,
> = MainUseAxiosParameters<T, K> & {
    progressOptions?: ProgressOptions;
};

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

export type UseAxios =<
    T extends Record<string, unknown>,
K extends Record<string, unknown> | undefined = undefined,
>(
    options: UseAxiosParameters<T, K>,
) => [AxiosState<K extends undefined ? T : K>, AxiosHandler<T, K>];

const DEFAULT_PROGRESS_STEPS = [0, 10, 25, 45, 60, 75, 85, 95];
const DEFAULT_MIN_DELAY = 300;
const PROGRESS_RESET_DELAY = 300;

export const useAxios: UseAxios =<
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
    const [progress, setProgress] = React.useState<number>(0);

    const progressTimerRef = React.useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = React.useRef<number>(0);

    const progressOptions = payload.progressOptions;

    const resetState: () => void = React.useCallback(() => {
        setIsLoading(false);
        setData(undefined);
        setError(undefined);
        setProgress(0);

        if (progressTimerRef.current) {
            clearTimeout(progressTimerRef.current);
            progressTimerRef.current = null;
        }
    }, []);

    const simulateProgress = React.useCallback(
        (steps: number[], totalDuration: number) => {
            console.log('Simulating progress', { steps, totalDuration });
            if (steps.length === 0) {
                setProgress(0);
                return;
            }

            setProgress(steps[0]);

            const intervalDuration = totalDuration / steps.length;
            let currentStepIndex = 1;

            const progressInterval = () => {
                if (currentStepIndex < steps.length) {
                    setProgress(steps[currentStepIndex]);
                    currentStepIndex++;
                    progressTimerRef.current = setTimeout(
                        progressInterval,
                        intervalDuration
                    );
                }
            };

            progressTimerRef.current = setTimeout(progressInterval, intervalDuration);
        },
        []
    );

    const axiosRequest: AxiosHandler<T, K> = React.useCallback(
        async (...parameters) => {
            const [config] = parameters;

            try {
                setIsLoading(true);
                setError(undefined);
                setProgress(0);
                startTimeRef.current = Date.now();

                const steps = progressOptions?.steps || DEFAULT_PROGRESS_STEPS;
                const minDelay = progressOptions?.minDelay || DEFAULT_MIN_DELAY;

                simulateProgress(steps, minDelay * 0.9); // Use 90% of minDelay for progression

                const modeledData = await modelAxiosDataResponse<T, K>(payload, config);

                const elapsedTime = Date.now() - startTimeRef.current;
                const remainingDelay = Math.max(0, minDelay - elapsedTime);

                // Wait for remaining delay to let simulation complete
                if (remainingDelay > 0) {
                    await new Promise(resolve => setTimeout(resolve, remainingDelay));
                }

                if (progressTimerRef.current) {
                    clearTimeout(progressTimerRef.current);
                    progressTimerRef.current = null;
                }

                setProgress(100);
                setData(modeledData);
                return modeledData;
            } catch (error: unknown) {
                if (progressTimerRef.current) {
                    clearTimeout(progressTimerRef.current);
                    progressTimerRef.current = null;
                }

                setError(ApiRequestError.create(error));
                throw error;
            } finally {
                setIsLoading(false);
                setTimeout(() => setProgress(0), PROGRESS_RESET_DELAY);
            }
        },
        [payload, progressOptions, simulateProgress]
    );

    const memoizedState = React.useMemo(() => {
        return {
            data,
            error,
            isLoading,
            progress,
            resetState,
        };
    }, [data, error, isLoading, progress, resetState]);

    React.useEffect(() => {
        return () => {
            resetState();
        };
    }, [resetState]);

    return [memoizedState, axiosRequest];
};
