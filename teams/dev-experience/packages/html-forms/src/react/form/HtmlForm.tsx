import { FormProvider, useForm } from '@conform-to/react';
import React from 'react';

export type HtmlFormProps = {
  children?: React.ReactNode;
  className?: string;
} & Parameters<typeof useForm>[0];

export function HtmlForm(props: HtmlFormProps): React.ReactNode {
  const [htmlFormProps] = useForm(props);

  return (
    <FormProvider context={htmlFormProps.context}>
      <form {...htmlFormProps} className={props.className}>
        {props.children}
      </form>
    </FormProvider>
  );
}
