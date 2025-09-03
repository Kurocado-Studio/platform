import { type LightDarkThemeToggleHandler } from '../types';

export type ThemeVariableHandler = (options: {
  variableName: string;
  variableValue: string;
}) =>
  | {
      variableName: string;
      variableValue: string;
    }
  | undefined;

export type VariablesMapHandler = (
  htmlStyleElementReference: HTMLStyleElement | undefined | null,
  cssVariablesPayload: Record<string, unknown>,
) => HTMLStyleElement;

export interface ThemeProviderComposer {
  handleSetThemeVariable: ThemeVariableHandler;
  handleVariablesMap: VariablesMapHandler;
  handleToggleLightDarkTheme: LightDarkThemeToggleHandler;
}
