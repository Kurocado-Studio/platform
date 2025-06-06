import { ReactTestingLibrary } from '@internal/config';
import type React from 'react';
import { type AxeCore, axe } from 'vitest-axe';

const { render } = ReactTestingLibrary;

export const renderWithA11y = (
  Component: React.ReactElement,
  wrapper?: React.ComponentType<{ children: React.ReactNode }>,
): ReturnType<typeof render> => {
  return render(Component, { wrapper });
};

export const runA11yAudit = async (
  container: HTMLElement,
): Promise<AxeCore.AxeResults> => {
  return axe(container);
};

export const testA11y = async (
  Component: React.ReactElement,
  wrapper?: React.ComponentType<{ children: React.ReactNode }>,
): Promise<AxeCore.AxeResults> => {
  const { container } = renderWithA11y(Component, wrapper);
  return runA11yAudit(container);
};
