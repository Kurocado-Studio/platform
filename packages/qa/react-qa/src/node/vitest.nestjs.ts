import { get } from 'lodash-es';
import swc from 'unplugin-swc';
import type { PluginOption } from 'vite';

import { type VitestConfig, vitestConfig } from '../common/vitestConfig';

export type VitestNestjs = VitestConfig;

export const vitestNestjs: VitestNestjs = {
  ...vitestConfig,
  plugins: [
    ...get(vitestConfig, ['plugins'], []),
    swc.vite({
      module: { type: 'es6' },
    }),
  ] as Array<PluginOption>,
  test: {
    ...get(vitestConfig, ['test'], {}),
    coverage: {
      ...get(vitestConfig, ['test', 'coverage'], {}),
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['test/**/*.{ts,tsx}', '**/*.d.ts'],
    },
    environment: 'node',
    setupFiles: ['./setup.node.ts'],
  },
};
