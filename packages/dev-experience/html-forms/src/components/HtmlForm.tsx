import { FormProvider, useForm } from '@conform-to/react';
import React from 'react';

export type HtmlFormProperties = {
  children: React.ReactNode;
  className?: string;
} & Parameters<typeof useForm>[0];

export function HtmlForm(properties: HtmlFormProperties): React.ReactNode {
  const [htmlFormProperties] = useForm(properties);

  console.log('htmlFormProperties', htmlFormProperties);

  return (
    <FormProvider context={htmlFormProperties.context}>
      <form
        {...htmlFormProperties}
        id={htmlFormProperties.id}
        className={properties.className}
        onSubmit={(event) => {
          event.preventDefault(); // stop full page reload
          console.log('submit', event);
          htmlFormProperties.onSubmit?.(event); // let Conform do its thing
        }}
      >
        {properties.children}
      </form>
    </FormProvider>
  );
}
