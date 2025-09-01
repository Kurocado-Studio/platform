import type { ThemeProviderComposer } from '../domain';

vi.mock('../domain', () => ({
  handleSetThemeVariable: vi.fn().mockName('handleSetThemeVariable'),
  handleVariablesMap: vi.fn().mockName('handleVariablesMap'),
  handleToggleLightDarkTheme: vi.fn().mockName('handleToggleLightDarkTheme'),
}));

import { composeThemeProvider } from './composeThemeProvider';
import {
  handleSetThemeVariable,
  handleVariablesMap,
  handleToggleLightDarkTheme,
} from '../domain';

describe('composeThemeProvider', () => {
  it('returns a ThemeProviderComposer shape', () => {
    const provider: ThemeProviderComposer = composeThemeProvider();
    expect(provider).toBeDefined();
  });

  it('returns the exact domain handler references', () => {
    const provider = composeThemeProvider();

    expect(provider.handleSetThemeVariable).toBe(handleSetThemeVariable);
    expect(provider.handleVariablesMap).toBe(handleVariablesMap);
    expect(provider.handleToggleLightDarkTheme).toBe(handleToggleLightDarkTheme);

    // also works as a structural equality check
    expect(provider).toEqual({
      handleSetThemeVariable,
      handleVariablesMap,
      handleToggleLightDarkTheme,
    });
  });

  it('exposed handlers are callable (passthrough)', () => {
    const provider = composeThemeProvider();
const handleVariablesMapParameters: Parameters<typeof handleVariablesMap> = [undefined, { '--space-2': '8px' }]
const handleSetThemeVariableParameters: Parameters<typeof handleSetThemeVariable> = [{variableName:'color.primary', variableValue:'#ff0000'}]

    provider.handleSetThemeVariable(...handleSetThemeVariableParameters);
    provider.handleVariablesMap(...handleVariablesMapParameters);
    provider.handleToggleLightDarkTheme();

    expect(handleSetThemeVariable).toHaveBeenCalledWith(...handleSetThemeVariableParameters);
    expect(handleVariablesMap).toHaveBeenCalledWith(...handleVariablesMapParameters);
    expect(handleToggleLightDarkTheme).toHaveBeenCalledWith();
  });
});
