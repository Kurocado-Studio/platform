export type * from './storybook.library';

export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Sizes = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type Theme = Record<string, Record<string, unknown>>;

export type LightDarkThemeToggleHandler = () => void;

export interface ThemeProviderProperties {
  setTheme: (theme: Record<string, unknown>) => void;
  setThemeVariable: (variableName: string, variableValue: string) => void;
  toggleLightDarkTheme: LightDarkThemeToggleHandler;
}
