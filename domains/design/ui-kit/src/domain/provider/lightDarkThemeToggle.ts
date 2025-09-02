export function handleToggleLightDarkTheme(): void {
  const root = document.documentElement;
  const selectedMode = root.classList.contains('dark');
  root.classList.toggle('dark', !selectedMode);
}
