/* eslint import/no-default-export:0 */
import { execSync } from 'node:child_process';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/exports.ts'],
  format: ['esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  minify: true,
  target: 'esnext',
  clean: true,
  inject: ['./reactShim.js'],
  onSuccess: async (): Promise<void> => {
    const stdio = 'inherit';
    execSync('copyfiles -u 1 "src/ui-domain/{styles,fonts}/**/*" dist', {
      stdio,
    });
    execSync('copyfiles -u 1 "src/ui-domain/tokens/tokens.json" dist', {
      stdio,
    });
  },
});
