import {
  type ThemeProviderComposer,
  handleSetThemeVariable,
  handleToggleLightDarkTheme,
  handleVariablesMap,
} from '../domain';

export function composeThemeProvider(): ThemeProviderComposer {
  return {
    handleSetThemeVariable,
    handleVariablesMap,
    handleToggleLightDarkTheme,
  };
}
