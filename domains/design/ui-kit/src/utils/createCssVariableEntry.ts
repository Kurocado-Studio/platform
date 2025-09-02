export function createCssVariableEntry(
  prefix: string,
  name: string,
  value: string,
): {
  cssVariableName: string;
  cssVariableValue: string;
  cssVariableReference: string;
} {
  const cssVariableName = `--${prefix}-${name}`;
  const cssVariableValue = value;
  const cssVariableReference = `var(${cssVariableName})`;

  return {
    cssVariableName,
    cssVariableValue,
    cssVariableReference,
  };
}
