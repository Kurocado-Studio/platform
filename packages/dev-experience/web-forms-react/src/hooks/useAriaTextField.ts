import { useField } from '@conform-to/react';
import { mergeProps } from '@react-aria/utils';
import { get } from 'lodash-es';
import { useRef } from 'react';
import { useTextField as useAdobeTextField } from 'react-aria';

import type {
  TextFieldApi,
  TextFieldMeta,
  TextFieldProperties,
} from '../types';
import { composeAriaValidityState } from '../utils';

export const useAriaTextField = <
  FieldSchema = string,
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError extends string[] = string[],
>(
  config: TextFieldProperties<FieldSchema, FormSchema, FormError>,
  formMeta?: TextFieldMeta<FormSchema, FormError>,
): TextFieldApi => {
  const inputReference = useRef(null);

  const { name, label } = config;
  const [meta] = useField(name, formMeta);

  const inputId = `input-${meta.name}`;
  const labelId = `label-${meta.name}`;

  const required = get(config, ['required'], false);

  const metaErrors = Array.isArray(meta.errors) ? meta.errors : [];

  const combinedErrors = config.errorMessage
    ? [config.errorMessage, ...metaErrors]
    : metaErrors;

  const errorMessage =
    Array.isArray(combinedErrors) && combinedErrors.length > 0
      ? combinedErrors.join(', ')
      : undefined;

  const ariaTextFieldProperties = {
    'aria-describedby': meta.descriptionId,
    'aria-label': label,
    'aria-errormessage': errorMessage,
    'aria-labelledby': 'meta.descriptionId',
    autoCapitalize: get(config, ['autoCapitalize'], 'off'),
    defaultValue: get(config, ['defaultValue'], meta.initialValue as string),
    errorMessage,
    htmlFor: inputId,
    id: inputId,
    isInvalid: get(config, ['isInvalid'], !meta.valid),
    label,
    name: get(meta, ['name'], name),
    validationBehavior: get(config, ['validationBehavior'], 'aria'),
  };

  const {
    labelProps,
    inputProps,
    errorMessageProps,
    descriptionProps,
    validationErrors,
    ...restTextFieldProperties
  } = useAdobeTextField(ariaTextFieldProperties, inputReference);

  const combinedInputProperties = mergeProps({
    ...inputProps,
    'aria-labelledby': inputId,
    disabled: get(config, ['disabled']),
    'aria-invalid': get(inputProps, ['aria-invalid'], false),
    ref: inputReference,
  });

  const validationDetails = composeAriaValidityState(
    restTextFieldProperties.validationDetails,
  );

  return {
    labelProps: {
      ...labelProps,
      id: labelId,
      htmlFor: inputId,
      children: config.label,
      required,
    },
    inputProps: combinedInputProperties,
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
