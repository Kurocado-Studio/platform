export const HTMLStyleElementId = 'KUROCADO_STUDIO_CSS_VARIABLES_MAP';

export function handleVariablesMap(
  htmlStyleElementRef: HTMLStyleElement | null,
  cssVariablesPayload: Record<string, unknown>,
): HTMLStyleElement {
  let styleElRef: HTMLStyleElement | null = htmlStyleElementRef
    ? htmlStyleElementRef
    : (document.getElementById(HTMLStyleElementId) as HTMLStyleElement);

  if (!styleElRef) {
    styleElRef = document.createElement('style');
    styleElRef.id = HTMLStyleElementId;
  }

  styleElRef.textContent = `:root {
    ${Object.entries(cssVariablesPayload)
      .map(([variableName, variableValue]) =>
        typeof variableValue === 'string'
          ? `${variableName}: ${variableValue};`
          : '',
      )
      .join('\n')}
  }`;

  document.head.appendChild(styleElRef);
  return styleElRef;
}
