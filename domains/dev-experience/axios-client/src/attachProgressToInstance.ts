import type { AxiosInstance, AxiosProgressEvent } from 'axios';

import { DEFAULT_PROGRESS_OPTIONS } from './constants';
import { ProgressCallback, ProgressOptions } from './types';

export const attachProgressToInstance = (
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

  instance.interceptors.request.use((request) => {
    // Attach progress handlers
    request.onDownloadProgress = createProgressHandler(onDownloadProgress);
    request.onUploadProgress = createProgressHandler(onUploadProgress, 100);

    // Always start simulation at request time
    if (onDownloadProgress) simulateProgressSteps(onDownloadProgress);

    return request;
  });

  instance.interceptors.response.use(
    async (response) => {
      if (onDownloadProgress && !simulationRunning) {
        simulateProgressSteps(onDownloadProgress);
      }

      await new Promise((resolve) => setTimeout(resolve, minimumDelay));

      onDownloadProgress?.(100);
      clearSimulation();
      return response;
    },
    (error) => {
      clearSimulation();
      return Promise.reject(error);
    },
  );

  return instance;
};
