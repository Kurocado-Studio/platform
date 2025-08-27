import { useField, useInputControl } from '@conform-to/react';
import { mergeProps } from '@react-aria/utils';
import { get } from 'lodash-es';
import { useRef } from 'react';
import { useTextField } from 'react-aria';

import type { TextFieldApi, TextFieldMeta, TextFieldProps } from 'src/types';
import { composeAriaValidityState } from 'src/utils/composeAriaValidityState';

export const useAriaTextField = <
  FieldSchema = string,
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError extends string[] = string[],
>(
  config: TextFieldProps<FieldSchema, FormSchema, FormError>,
  formMeta?: TextFieldMeta<FormSchema, FormError>,
): TextFieldApi => {
  const { name, label } = config;

  const inputRef = useRef<HTMLInputElement>(null);

  const [meta] = useField(name, formMeta);

  const conformInputControl = useInputControl({
    name: meta.name,
    formId: meta.formId,
  });

  const required = get(config, ['isRequired'], false);

  const metaErrors = Array.isArray(meta.errors) ? meta.errors : [];

  const combinedErrors = config.errorMessage
    ? [config.errorMessage, ...metaErrors]
    : metaErrors;

  const errorMessage =
    Array.isArray(combinedErrors) && combinedErrors.length > 0
      ? combinedErrors.join(', ')
      : undefined;

  const fallbackLabelRef = useRef(
    `label-${meta.descriptionId ?? `descriptionId-fallback-${name}`}`,
  );

  const labelOrFallback = config.label ?? fallbackLabelRef.current;

  const ariaTextFieldProps = {
    'aria-describedby': meta.descriptionId,
    'aria-details': get(config, ['aria-details']),
    'aria-errormessage': errorMessage,
    'aria-label': labelOrFallback,
    'aria-labelledby': labelOrFallback,
    autoCapitalize: get(config, ['autoCapitalize'], 'off'),
    defaultValue: get(config, ['defaultValue'], meta.initialValue as string),
    errorMessage,
    htmlFor: labelOrFallback,
    isInvalid: get(config, ['isInvalid'], !meta.valid),
    label,
    name: get(meta, ['name'], name),
    onBlur: get(conformInputControl, ['blur']),
    onChange: get(conformInputControl, ['change']),
    validationBehavior: get(config, ['validationBehavior'], 'aria'),
    value: get(conformInputControl, ['value' as string]),
  };

  const {
    labelProps,
    inputProps,
    errorMessageProps,
    descriptionProps,
    validationErrors,
    ...restTextFieldProps
  } = useTextField(ariaTextFieldProps, inputRef);

  const combinedInputProps = mergeProps(
    {
      ...inputProps,
      'aria-invalid': !meta.valid,
      ref: inputRef,
    },
    {
      ref: inputRef,
      'aria-invalid': get(inputProps, ['aria-invalid'], false),
    },
  );

  const validationDetails = composeAriaValidityState(
    restTextFieldProps.validationDetails,
  );

  return {
    labelProps: {
      ...labelProps,
      children: config.label,
      htmlFor: labelOrFallback,
      required,
    },
    inputProps: combinedInputProps,
    descriptionProps: {
      ...descriptionProps,
      children: config.description,
      id: meta.descriptionId,
    },
    errorMessageProps: {
      ...errorMessageProps,
      id: meta.errorId,
      children: errorMessage,
    },
    isInvalid: !meta.valid,
    validationDetails,
    validationErrors,
  };
};
