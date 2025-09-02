import type { ThemeProviderComposer } from '../domain';
import {
  handleSetThemeVariable,
  handleToggleLightDarkTheme,
  handleVariablesMap,
} from '../domain';
import { composeThemeProvider } from './composeThemeProvider';

vi.mock('../domain', () => ({
  handleSetThemeVariable: vi.fn().mockName('handleSetThemeVariable'),
  handleVariablesMap: vi.fn().mockName('handleVariablesMap'),
  handleToggleLightDarkTheme: vi.fn().mockName('handleToggleLightDarkTheme'),
}));

describe('composeThemeProvider', () => {
  it('returns a ThemeProviderComposer shape', () => {
    const provider: ThemeProviderComposer = composeThemeProvider();
    expect(provider).toBeDefined();
  });

  it('returns the exact domain handler references', () => {
    const provider = composeThemeProvider();

    expect(provider.handleSetThemeVariable).toBe(handleSetThemeVariable);
    expect(provider.handleVariablesMap).toBe(handleVariablesMap);
    expect(provider.handleToggleLightDarkTheme).toBe(
      handleToggleLightDarkTheme,
    );

    // also works as a structural equality check
    expect(provider).toEqual({
      handleSetThemeVariable,
      handleVariablesMap,
      handleToggleLightDarkTheme,
    });
  });

  it('exposed handlers are callable (passthrough)', () => {
    const provider = composeThemeProvider();
    const handleVariablesMapParameters: Parameters<typeof handleVariablesMap> =
      [undefined, { '--space-2': '8px' }];
    const handleSetThemeVariableParameters: Parameters<
      typeof handleSetThemeVariable
    > = [{ variableName: 'color.primary', variableValue: '#ff0000' }];

    provider.handleSetThemeVariable(...handleSetThemeVariableParameters);
    provider.handleVariablesMap(...handleVariablesMapParameters);
    provider.handleToggleLightDarkTheme();

    expect(handleSetThemeVariable).toHaveBeenCalledWith(
      ...handleSetThemeVariableParameters,
    );
    expect(handleVariablesMap).toHaveBeenCalledWith(
      ...handleVariablesMapParameters,
    );
    expect(handleToggleLightDarkTheme).toHaveBeenCalledWith();
  });
});
