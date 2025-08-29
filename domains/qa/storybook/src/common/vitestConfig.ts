import type { ViteUserConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export interface VitestConfig extends ViteUserConfig {}

export const vitestConfig: VitestConfig = {
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'node',
    globals: true,
  },
};
