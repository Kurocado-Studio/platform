/* eslint unicorn/filename-case: 0 */
/* eslint import/no-default-export: 0 */
import { ThemeProvider } from '@kurocado-studio/vue-ui-kit';
import { themes } from '@storybook/theming';
import type { Preview } from '@storybook/vue3';
import { get } from 'lodash-es';

import './tailwind.css';

const LIGHT_THEME = 'Light setup';
const DARK_THEME = 'Dark setup';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global setup for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [LIGHT_THEME, DARK_THEME],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    controls: {
      matchers: {},
    },
    docs: {
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? themes.dark
        : themes.light,
    },
  },
  tags: ['autodocs'],
};

export const parameters = {
  darkMode: {
    current: 'light',
  },
  controls: {
    matchers: {
      color: /(?<temp1>background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (storyFn: () => unknown, context: Record<string, unknown>) => {
    const selectedTheme = get(context, ['globals', 'theme']) === LIGHT_THEME;

    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', !selectedTheme);
    }

    return {
      components: { ThemeProvider, Story: storyFn() },
      setup() {
        return {  };
      },
      template: `
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      `,
    };
  },
];

export default preview;
