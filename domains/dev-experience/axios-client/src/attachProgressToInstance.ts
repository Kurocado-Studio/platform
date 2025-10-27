import type {
  AxiosInstance,
  AxiosProgressEvent,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { get } from 'lodash-es';

import { DEFAULT_PROGRESS_OPTIONS } from './constants';
import { ProgressCallback, ProgressOptions } from './types';

export const attachProgressToInstance = <T extends object = object>(
  instance: AxiosInstance,
  progressOptions: ProgressOptions = {},
) => {
  const {
    steps = DEFAULT_PROGRESS_OPTIONS.steps,
    minimumDelay = DEFAULT_PROGRESS_OPTIONS.minimumDelay,
    onDownloadProgress,
    onUploadProgress,
  } = progressOptions;

  let simulatedTimer: NodeJS.Timeout | undefined;
  let simulationRunning = false;

  const clearSimulation = () => {
    if (simulatedTimer) clearTimeout(simulatedTimer);
    simulatedTimer = undefined;
    simulationRunning = false;
  };

  const simulateProgressSteps = (callback?: ProgressCallback) => {
    if (!callback || simulationRunning) return;
    clearSimulation();

    simulationRunning = true;
    let index = 0;
    const interval = minimumDelay / steps.length;

    const nextStep = () => {
      if (index < steps.length) {
        callback(steps[index]);
        index++;
        simulatedTimer = setTimeout(nextStep, interval);
      }
    };

    nextStep();
  };

  const createProgressHandler =
    (callback?: ProgressCallback, maxProgress: number = 80) =>
    (event: AxiosProgressEvent) => {
      if (!callback) return;
      let progress = 0;

      if (event.lengthComputable) {
        progress = Math.min(
          maxProgress,
          Math.round(
            (event.loaded / (event.total ?? event.loaded)) * maxProgress,
          ),
        );
      }

      callback(progress);

      if (progress >= maxProgress) clearSimulation();
    };

  const requestUse = get(instance, 'interceptors.request.use', () => {});
  requestUse((request: InternalAxiosRequestConfig<T>) => {
    request.onDownloadProgress = createProgressHandler(onDownloadProgress);
    request.onUploadProgress = createProgressHandler(onUploadProgress, 100);

    if (onDownloadProgress) simulateProgressSteps(onDownloadProgress);

    return request;
  });

  // ✅ safely get the response.use method
  const responseUse = get(instance, 'interceptors.response.use', () => {});
  responseUse(
    async (response: AxiosResponse<T>) => {
      if (onDownloadProgress && !simulationRunning) {
        simulateProgressSteps(onDownloadProgress);
      }

      await new Promise((resolve) => setTimeout(resolve, minimumDelay));

      onDownloadProgress?.(100);
      clearSimulation();
      return response;
    },
    (error: unknown) => {
      clearSimulation();
      return Promise.reject(error);
    },
  );

  return instance;
};
