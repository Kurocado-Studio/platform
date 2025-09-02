import { vitestReact } from '@kurocado-studio/qa/web';
import { defineConfig } from 'vitest/config';

// TODO: fix ts-expect-error
// @ts-expect-error while fixing types
export default defineConfig(vitestReact);
