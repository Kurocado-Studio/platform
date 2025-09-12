/* eslint import/no-default-export: 0 */
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/exports.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  minify: true,
  target: 'esnext',
  noExternal: ['@kurocado-studio/axios-client-domain'],
  external: ['react', 'vue'],
  ...options,
}));
