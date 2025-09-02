export const HTMLStyleElementId = 'KUROCADO_STUDIO_CSS_VARIABLES_MAP';

export function handleVariablesMap(
  htmlStyleElementReference: HTMLStyleElement | undefined | null,
  cssVariablesPayload: Record<string, unknown>,
): HTMLStyleElement {
  let styleElementReference: HTMLStyleElement | null =
    htmlStyleElementReference ??
    (document.querySelector(HTMLStyleElementId) as HTMLStyleElement);

  if (!styleElementReference) {
    styleElementReference = document.createElement('style');
    styleElementReference.id = HTMLStyleElementId;
  }

  styleElementReference.textContent = `:root {
    ${Object.entries(cssVariablesPayload)
      .map(([variableName, variableValue]) =>
        typeof variableValue === 'string'
          ? `${variableName}: ${variableValue};`
          : '',
      )
      .join('\n')}
  }`;

  document.head.append(styleElementReference);
  return styleElementReference;
}
