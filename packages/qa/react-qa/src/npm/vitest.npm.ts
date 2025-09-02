import { get } from 'lodash-es';

import { type VitestConfig, vitestConfig } from '../common/vitestConfig';

export type VitestNpm = VitestConfig;

export const vitestNpm: VitestNpm = {
  ...vitestConfig,
  plugins: get(vitestConfig, ['plugins'], []),
  test: {
    ...get(vitestConfig, ['test'], {}),
    coverage: {
      ...get(vitestConfig, ['test', 'coverage'], {}),
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
    },
    environment: 'node',
    setupFiles: ['./setup.npm.ts'],
  },
};
