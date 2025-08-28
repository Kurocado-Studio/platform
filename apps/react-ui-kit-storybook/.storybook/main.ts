/* eslint import/no-default-export: 0 */
import tsconfigPaths from 'vite-tsconfig-paths';

const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.stories.@(ts|tsx|js|jsx|mdx|vue)',
    '../src/**/*.mdx',
    '../../packages/**/src/**/*.stories.@(ts|tsx|js|jsx|mdx|vue)',
    '../../packages/**/src/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  // @ts-expect-error for now
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins || []), tsconfigPaths()];
    return config;
  },
};

export default config;
