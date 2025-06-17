import type { FieldName, FormId } from '@conform-to/react';
import type { LabelHTMLAttributes, ReactNode } from 'react';
import type React from 'react';

import { type ITextField } from '../../domain';

export interface AdditionalAriaTextFieldProps {
  htmlFor: string;
  required?: boolean;
}

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  htmlFor: string;
  required?: boolean;
  children?: ReactNode;
};

export interface TextFieldApi {
  descriptionProps?: React.HTMLAttributes<HTMLDivElement>;
  errorMessageProps?: React.HTMLAttributes<HTMLDivElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
  isInvalid: boolean;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement> &
    AdditionalAriaTextFieldProps;
  validationDetails: ValidityState;
  validationErrors: Array<string>;
}

export interface TextFieldMeta<
  FormSchema extends Record<string, unknown>,
  FormError,
> {
  formId?: FormId<FormSchema, FormError>;
}

export type TextFieldProps<
  FieldSchema = string,
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError extends string[] = string[],
> = {
  errorMessage?: string;
  onChange?: React.Dispatch<
    React.SetStateAction<string | Array<string> | undefined>
  >;
  name?: FieldName<FieldSchema, FormSchema, FormError> | ITextField['name'];
} & Partial<ITextField>;

export type ValidityStateProps = ValidityState;
