/* eslint unicorn/filename-case: 0 */
/* eslint import/no-default-export: 0 */
import { ThemeProvider } from '@kurocado-studio/react-ui-kit';
import { themes } from '@storybook/theming';
import { get } from 'lodash-es';
import React, { type FC, useEffect } from 'react';

import cssVariables from '../cssVariables.json';
import './tailwind.css';

const LIGHT_THEME = 'Light setup';
const DARK_THEME = 'Dark setup';

const preview = {
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
  (Story: FC, context: Record<string, unknown>): React.ReactNode => {
    function Decorator(): React.ReactNode {
      const selectedTheme = get(context, ['globals', 'theme']) === LIGHT_THEME;

      useEffect(() => {
        document.documentElement.classList.toggle('dark', !selectedTheme);
      }, [selectedTheme]);

      return (
        <ThemeProvider cssVariables={cssVariables}>
          <Story />
        </ThemeProvider>
      );
    }

    return <Decorator />;
  },
];

export const tags = ['autodocs'];

export default preview;
