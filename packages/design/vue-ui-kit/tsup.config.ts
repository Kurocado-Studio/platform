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
  noExternal: ['@kurocado-studio/ui-kit-domain'],
  onSuccess: async (): Promise<void> => {
    const stdio = 'inherit';
    execSync('vue-tsc -p tsconfig.vue.json', { stdio });
    execSync('api-extractor run --local', { stdio });
    execSync('rm -rf dist/exports.d.ts', { stdio });
    execSync('rm -rf dist/components', { stdio });
    execSync('rm -rf dist/context', { stdio });
  },
});
