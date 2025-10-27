import {ProgressOptions} from "./types";

export const PROGRESS_STEP_MAPS = {
    slowStart: [
        0, 2, 4, 6, 10, 14, 18, 22, 28, 34, 40, 46, 52, 58, 64, 70, 76, 82, 88, 95,
    ],
    fastStart: [
        0, 10, 18, 26, 34, 42, 50, 58, 64, 68, 72, 76, 78, 80, 82, 86, 88, 90, 93,
        95,
    ],
    mixed: [
        0, 3, 6, 8, 12, 18, 22, 28, 32, 38, 44, 50, 55, 60, 64, 70, 75, 80, 88, 95,
    ],
};

export const DEFAULT_PROGRESS_OPTIONS: ProgressOptions = {
    minimumDelay: 300,
    steps: PROGRESS_STEP_MAPS.mixed,
    onDownloadProgress: undefined,
    onUploadProgress: undefined,
};
