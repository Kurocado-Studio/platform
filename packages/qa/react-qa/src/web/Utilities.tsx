import { json } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { type RenderResult, render } from '@testing-library/react';
import React from 'react';
import { axe } from 'vitest-axe';

export function renderComponent(
  ...options: Parameters<typeof render>
): RenderResult {
  return render(...options);
}

export async function auditComponentA11y(
  ...options: Parameters<typeof render>
): Promise<ReturnType<typeof axe>> {
  const { container } = renderComponent(...options);
  return axe(container);
}

export const renderWithRemix = <T extends Record<string, unknown>>(
  Component?: React.ComponentType<T> | null,
  loaderData?: Record<string, unknown>,
): RenderResult => {
  const RemixStub = createRemixStub([
    {
      path: '/',
      Component: Component as React.ComponentType,
      loader() {
        return json(loaderData || {});
      },
    },
  ]);

  return render(<RemixStub />);
};
