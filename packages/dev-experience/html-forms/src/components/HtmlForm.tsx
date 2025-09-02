import { FormProvider, useForm } from '@conform-to/react';
import React from 'react';

export type HtmlFormProperties = {
  children: React.ReactNode;
  className?: string;
} & Parameters<typeof useForm>[0];

export function HtmlForm(properties: HtmlFormProperties): React.ReactNode {
  const [htmlFormProperties] = useForm(properties);

  return (
    <FormProvider context={htmlFormProperties.context}>
      <form {...htmlFormProperties} className={properties.className}>
        {properties.children}
      </form>
    </FormProvider>
  );
}
