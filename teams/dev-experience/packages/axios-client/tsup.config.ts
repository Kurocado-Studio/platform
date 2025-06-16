/* eslint import/no-default-export: 0 */
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/react/exports.ts', 'src/vue/exports.ts', 'src/node/exports.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  minify: true,
  target: 'esnext',
  external: ['react', 'vue'],
  ...options,
}));
