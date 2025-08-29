import { type RenderResult, render } from '@testing-library/react';
import { createRemixStub } from '@remix-run/testing';
import { json } from '@remix-run/node';
import { axe } from 'vitest-axe';
import React from 'react';

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

export const renderWithRemix = (
  Component?: React.FunctionComponent,
  loaderData?: any,
): RenderResult => {
  const RemixStub = createRemixStub([
    {
      path: '/',
      // @ts-ignore mismatch in types
      Component,
      loader() {
        return json(loaderData || {});
      },
    },
  ]);

  return render(<RemixStub />);
};
