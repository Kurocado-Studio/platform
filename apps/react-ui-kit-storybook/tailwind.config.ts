import { kurocadoTheme } from '@kurocado-studio/react-ui-kit';

export const content = [
  './.storybook/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
  './stories/**/*.{ts,tsx}',
  './node_modules/@kurocado-studio/react-ui-kit/dist/**/*.{js,css}'
];

export const theme = kurocadoTheme;
