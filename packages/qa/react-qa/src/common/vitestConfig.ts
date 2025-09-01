import tsconfigPaths from 'vite-tsconfig-paths';
import type { ViteUserConfig } from 'vitest/config';

export type VitestConfig = ViteUserConfig;

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
