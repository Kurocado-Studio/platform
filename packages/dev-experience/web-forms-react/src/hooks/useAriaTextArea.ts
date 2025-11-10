import { useField } from '@conform-to/react';
import { mergeProps } from '@react-aria/utils';
import { get } from 'lodash-es';
import { useRef } from 'react';
import { type AriaTextFieldOptions, useTextField } from 'react-aria';

import type { TextAreaApi, TextAreaMeta, TextAreaProperties } from '../types';
import { composeAriaValidityState } from '../utils';

export const useAriaTextArea = <
  FieldSchema = string,
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError extends string[] = string[],
>(
  config: TextAreaProperties<FieldSchema, FormSchema, FormError>,
  formMeta?: TextAreaMeta<FormSchema, FormError>,
): TextAreaApi => {
  const textAreaReference = useRef<HTMLTextAreaElement | null>(null);

  const { name, label } = config;
  const [meta] = useField(name, formMeta);

  const inputId = `textarea-${meta.name}`;
  const labelId = `textarea-label-${meta.name}`;
  const required = get(config, ['isRequired'], false);

  const metaErrors = Array.isArray(meta.errors) ? meta.errors : [];
  const combinedErrors = config.errorMessage
    ? [config.errorMessage, ...metaErrors]
    : metaErrors;

  const errorMessage =
    Array.isArray(combinedErrors) && combinedErrors.length > 0
      ? combinedErrors.join(', ')
      : undefined;

  const ariaTextAreaProperties: AriaTextFieldOptions<'textarea'> = {
    'aria-describedby': meta.descriptionId,
    'aria-label': label,
    'aria-errormessage': errorMessage,
    autoCapitalize: get(config, ['autoCapitalize'], 'sentences'),
    defaultValue: get(config, ['defaultValue'], meta.initialValue as string),
    errorMessage,
    id: inputId,
    isInvalid: get(config, ['isInvalid'], !meta.valid),
    label,
    name: get(meta, ['name'], name),
    validationBehavior: get(config, ['validationBehavior'], 'aria'),
    inputElementType: 'textarea',
  };

  const {
    labelProps,
    inputProps,
    errorMessageProps,
    descriptionProps,
    validationErrors,
    ...restTextAreaProperties
  } = useTextField(ariaTextAreaProperties, textAreaReference);

  const combinedTextAreaProperties = mergeProps({
    ...inputProps,
    disabled: get(config, ['disabled']),
    'aria-invalid': get(inputProps, ['aria-invalid'], false),
    ref: textAreaReference,
    rows: get(config, ['rows'], 4),
  });

  const validationDetails = composeAriaValidityState(
    restTextAreaProperties.validationDetails,
  );

  return {
    labelProps: {
      ...labelProps,
      id: labelId,
      htmlFor: inputId,
      children: config.label,
      required,
    },
    textAreaProps: combinedTextAreaProperties,
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
