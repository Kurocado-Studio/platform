import { get } from 'lodash-es';

import { type VitestConfig, vitestConfig } from '../common/vitestConfig';

export type VitestWeb= VitestConfig

export const vitestReact: VitestWeb = {
  ...vitestConfig,
  plugins: get(vitestConfig, ['plugins'], []),
  test: {
    ...get(vitestConfig, ['test'], {}),
    coverage: {
      ...get(vitestConfig, ['test', 'coverage'], {}),
      // @ts-expect-error type-mismatch
      include: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
      exclude: ['test/**/*.{ts,tsx}', '**/*.d.ts'],
    },
    css: true,
    tsconfig: './tsconfig.json',
    environment: 'jsdom',
    setupFiles: ['./setup.web.ts'],
  },
};
