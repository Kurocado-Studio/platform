import {
  type ThemeProviderProperties,
  composeThemeProvider,
} from '@kurocado-studio/ui-kit-domain';
import React from 'react';

interface ThemeProperties {
  cssVariables?: Record<string, unknown>;
  children?: React.ReactNode;
}

const ThemeContext = React.createContext<ThemeProviderProperties>({
  setThemeVariable: () => {},
  toggleLightDarkTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({
  cssVariables,
  children,
}: ThemeProperties): React.ReactNode {
  const themeProvider = React.useMemo(() => composeThemeProvider(), []);
  const styleElementReference = React.useRef<
    HTMLStyleElement | null | undefined
  >(undefined);

  const cssVariablesMap: Record<string, unknown> = cssVariables || {};

  const handleVariablesMap = React.useCallback(
    (cssVariablesPayload: Record<string, unknown>) => {
      styleElementReference.current = themeProvider.handleVariablesMap(
        styleElementReference.current,
        cssVariablesPayload,
      );
    },
    [themeProvider],
  );

  const toggleLightDarkTheme: ThemeProviderProperties['toggleLightDarkTheme'] =
    React.useCallback(() => {
      themeProvider.handleToggleLightDarkTheme();
    }, [themeProvider]);

  const setThemeVariable: ThemeProviderProperties['setThemeVariable'] =
    React.useCallback(
      (variableName, variableValue) => {
        const payload = themeProvider.handleSetThemeVariable({
          variableName,
          variableValue,
        });

        if (payload) {
          cssVariablesMap[payload.variableName] = payload.variableValue;
          handleVariablesMap(cssVariablesMap);
        }
      },
      [cssVariablesMap, handleVariablesMap, themeProvider],
    );

  const providerValue: ThemeProviderProperties = React.useMemo(
    () => ({
      setTheme: handleVariablesMap,
      setThemeVariable,
      toggleLightDarkTheme,
    }),
    [setThemeVariable, handleVariablesMap, toggleLightDarkTheme],
  );

  React.useEffect(() => {
    handleVariablesMap(cssVariablesMap);
    return () => {
      styleElementReference.current?.remove();
      styleElementReference.current = undefined;
    };
  }, [handleVariablesMap, cssVariablesMap]);

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = (): ThemeProviderProperties =>
  React.useContext(ThemeContext);
