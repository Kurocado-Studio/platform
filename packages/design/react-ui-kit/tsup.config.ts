/* eslint import/no-default-export:0 */
import { execSync } from 'node:child_process';
import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  entry: ['./src/exports.ts'],
  format: ['esm'],
  dts: true,
  splitting: true,
  minify: true,
  target: 'esnext',
  inject: ['./react-shim.js'],
  external: ['react', 'react-dom'],
  noExternal: ['@kurocado-studio/ui-kit-domain'],
  sourcemap: false,
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
