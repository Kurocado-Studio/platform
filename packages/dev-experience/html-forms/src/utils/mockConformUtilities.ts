import type { FormValue } from '@conform-to/dom';
import type { FieldMetadata, FormMetadata } from '@conform-to/react';
import { get } from 'lodash-es';
import { vi } from 'vitest';

export const composeRandomId = (): string => new Date().toISOString();

export const mockFieldMetadata = <
  FieldSchema = string,
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError = string[],
>(
  config?: Partial<FieldMetadata<FieldSchema, FormSchema, FormError>>,
): FieldMetadata<FieldSchema, FormSchema, FormError> => {
  // @ts-expect-error we are mocking this
  return {
    ...(config ? { ...config } : {}),
    allErrors: get(config, ['allErrors'], {}),
    descriptionId: get(config, ['descriptionId'], ''),
    dirty: get(config, ['dirty'], false),
    errorId: get(config, ['errorId'], composeRandomId()),
    errors: get(config, ['errors']),
    formId: get(config, ['formId'], composeRandomId()),
    id: get(config, ['id'], composeRandomId()),
    initialValue: get(config, ['initialValue'], ''),
    key: get(config, ['key']),
    name: get(config, ['name'], `test-name-${composeRandomId()}`),
    valid: get(config, ['valid'], true),
    value: get(config, ['value'], ''),
  };
};

export const mockFormMetadata = <
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError = string[],
>(
  config?: Partial<FormMetadata<FormSchema, FormError>>,
): FormMetadata<FormSchema, FormError> => {
  return {
    allErrors: get(config, ['allErrors'], {}),
    // @ts-expect-error we are mocking this
    context: {},
    descriptionId: '',
    dirty: false,
    errorId: '',
    errors: undefined,
    getFieldset: get(config, ['getFieldset'], vi.fn()),
    id: get(config, ['id'], composeRandomId()),
    initialValue: get(config, ['initialValue'], '') as FormValue<FormSchema>,
    // @ts-expect-error we are mocking this
    insert: get(config, ['insert'], vi.fn()),
    // @ts-expect-error we are mocking this
    key: get(config, ['insert'], composeRandomId()),
    name: get(config, ['name'], ''),
    noValidate: get(config, ['noValidate'], true),
    onSubmit: get(config, ['onSubmit'], vi.fn()),
    // @ts-expect-error we are mocking this
    remove: vi.fn(),
    // @ts-expect-error we are mocking this
    reorder: vi.fn(),
    // @ts-expect-error we are mocking this
    reset: vi.fn(),
    status: get(config, ['status'], 'success'),
    // @ts-expect-error we are mocking this
    update: vi.fn(),
    valid: false,
    // @ts-expect-error we are mocking this
    validate: vi.fn(),
    // @ts-expect-error we are mocking this
    value: get(config, ['value']),
  };
};
