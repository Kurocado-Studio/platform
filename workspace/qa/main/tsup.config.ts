/* eslint-disable import/no-default-export */
import { execSync } from 'node:child_process';
import { type Options, defineConfig } from 'tsup';

const tsupOptions: Options = {
  clean: true,
  dts: true,
  entry: [
    'src/index.ts',
    'src/nestjs/setup.nestjs.ts',
    'src/remix/setup.remix.ts',
    'src/remix/setup.npm.ts',
  ],
  external: ['react', 'react-dom', 'lightningcss'],
  format: ['esm'],
  sourcemap: true,
  splitting: true,
  target: 'node20',
  treeshake: true,
  onSuccess: async (): Promise<void> => {
    execSync('copyfiles -u 1 src/**/tsconfig.*.json dist', {
      stdio: 'inherit',
    });
  },
};

export default defineConfig((options: Options) => ({
  ...options,
  ...tsupOptions,
}));
