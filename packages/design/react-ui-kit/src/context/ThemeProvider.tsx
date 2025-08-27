import {
    ThemeProviderProps,
    composeThemeProvider
} from '@kurocado-studio/ui-kit-domain';
import React from 'react';

interface ThemeProps {
    cssVariables?: Record<string, unknown>;
  children?: React.ReactNode;
}

const ThemeContext = React.createContext<ThemeProviderProps>({
  setThemeVariable: () => {},
  toggleLightDarkTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({
                                  cssVariables,
  children,
}: ThemeProps): React.ReactNode {
  const themeProvider = React.useMemo(() => composeThemeProvider(), []);
  const styleElRef = React.useRef<HTMLStyleElement | null>(null);

  const cssVariablesMap: Record<string, unknown> = cssVariables || {}

  const handleVariablesMap = React.useCallback(
    (cssVariablesPayload: Record<string, unknown>) => {
      styleElRef.current = themeProvider.handleVariablesMap(
        styleElRef.current,
        cssVariablesPayload,
      );
    },
    [themeProvider],
  );

  const toggleLightDarkTheme: ThemeProviderProps['toggleLightDarkTheme'] =
    React.useCallback(() => {
      themeProvider.handleToggleLightDarkTheme();
    }, [themeProvider]);

  const setThemeVariable: ThemeProviderProps['setThemeVariable'] =
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

  const providerValue: ThemeProviderProps = React.useMemo(
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
      styleElRef.current?.remove();
      styleElRef.current = null;
    };
  }, [handleVariablesMap, cssVariablesMap]);

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = (): ThemeProviderProps =>
  React.useContext(ThemeContext);
