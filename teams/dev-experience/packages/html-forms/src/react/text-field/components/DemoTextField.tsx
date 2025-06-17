import React from 'react';

import type { TextFieldProps } from '../../types';
import { useTextField } from '../hooks/useTextField';

export function DemoTextField(props: TextFieldProps): React.ReactNode {
  const { labelProps, inputProps, errorMessageProps, descriptionProps } =
    useTextField(props);

  return (
    <div>
      <label {...labelProps}>
        {labelProps.children}
        {inputProps.required ? <span>*</span> : null}
      </label>
      <input {...inputProps} />
      {descriptionProps?.children ? <div {...descriptionProps} /> : null}
      {errorMessageProps?.children ? <div {...errorMessageProps} /> : null}
    </div>
  );
}
