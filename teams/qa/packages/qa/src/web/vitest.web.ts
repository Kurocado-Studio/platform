import { get } from 'lodash-es';

import { type VitestConfig, vitestConfig } from '../common/vitestConfig';

export interface VitestWeb extends VitestConfig {}

export const vitestReact: VitestWeb = {
  ...vitestConfig,
  plugins: get(vitestConfig, ['plugins'], []),
  test: {
    ...get(vitestConfig, ['test'], {}),
    coverage: {
      ...get(vitestConfig, ['test', 'coverage'], {}),
      // @ts-ignore type-mismatch
      include: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
      exclude: ['test/**/*.{ts,tsx}', '**/*.d.ts'],
    },
    css: true,
    tsconfig: './tsconfig.json',
    environment: 'jsdom',
    setupFiles: ['./setup.web.ts'],
  },
};
