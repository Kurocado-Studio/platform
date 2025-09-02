export function flattenResponsive(
  prefix: string,
  map: Record<string, string | number>,
): string[] {
  return Object.entries(map).map(
    ([breakpoint, value]) => `${breakpoint}:${prefix}${value}`,
  );
}
