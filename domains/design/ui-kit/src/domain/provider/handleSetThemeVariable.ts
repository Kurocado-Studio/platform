export { handleVariablesMap } from './variablesMap';

export function handleSetThemeVariable(options: {
  variableName: string;
  variableValue: string;
}):
  | {
      variableName: string;
      variableValue: string;
    }
  | undefined {
  const { variableName, variableValue } = options;

  const styles = getComputedStyle(document.documentElement);
  const cssVariableValue = styles.getPropertyValue(variableName);

  if (!cssVariableValue.trim().length) return;

  return {
    variableName,
    variableValue,
  };
}
