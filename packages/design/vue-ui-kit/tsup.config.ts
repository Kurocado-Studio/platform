/* eslint import/no-default-export:0 */
import { execSync } from 'node:child_process';
import { defineConfig } from 'tsup';
import vuePlugin from 'unplugin-vue/esbuild';

export default defineConfig({
  entry: ['./src/exports.ts'],
  format: ['esm'],
  dts: false,
  splitting: true,
  sourcemap: false,
  minify: true,
  target: 'esnext',
  clean: true,
  shims: false,
  external: ['vue'],
  esbuildPlugins: [vuePlugin()],
  onSuccess: async (): Promise<void> => {
    const stdio = 'inherit';
    execSync('vue-tsc -p tsconfig.vue.json', { stdio });
  },
});
