import { useField } from '@conform-to/react';
import { renderHook } from '@kurocado-studio/qa/web';
import { useTextField } from 'react-aria';
import type { Mock } from 'vitest';

import { HtmlForm } from '../../index';
import {
  composeAriaValidityState,
  mockFieldMetadata,
  mockFormMetadata,
} from '../utils';

vi.mock('@conform-to/react', async () => {
  return {
    ...(await vi.importActual('@conform-to/react')),
    useInputControl: vi.fn(),
    useField: vi.fn(),
  };
});

vi.mock('react-aria', async () => {
  return {
    ...(await vi.importActual('react-aria')),
    useTextField: vi.fn(),
  };
});

describe('useTextField Hook - Unit Tests', () => {
  const useFieldMock = useField as Mock<typeof useField>;
  const useTextFieldMock = useTextField as Mock<typeof useTextField>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('should return correct props with default configuration', async () => {
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        formId: 'form-id',
      }),
      mockFormMetadata(),
    ]);

    useTextFieldMock.mockReturnValue({
      labelProps: { htmlFor: 'test' },
      inputProps: {
        name: 'test',
        ref: { current: null },
        'aria-invalid': false,
      },
      isInvalid: true,
      errorMessageProps: { id: 'error-id', children: undefined },
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: [],
      validationDetails: {} as ValidityState,
    });

    const { useTextField } = await import('./useTextField');

    const { result } = renderHook(
      () =>
        useTextField({
          name: 'test',
        }),
      { wrapper: HtmlForm },
    );

    expect(result.current).toBeDefined();
    expect(result.current.labelProps).toEqual({
      htmlFor: 'label-desc-id',
      required: false,
      children: undefined,
    });
    expect(result.current.inputProps).toEqual({
      name: 'test',
      ref: { current: null },
      'aria-invalid': false,
    });
    expect(result.current.descriptionProps).toEqual({
      id: 'desc-id',
      children: undefined,
    });
    expect(result.current.errorMessageProps).toEqual({
      id: 'error-id',
      children: undefined,
    });
    expect(result.current.isInvalid).toBe(false);
    expect(result.current.validationDetails).toEqual(
      composeAriaValidityState(),
    );
    expect(result.current.validationErrors).toEqual([]);
  });

  test('should handle validation errors correctly', async () => {
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        errors: ['Field is required'],
        valid: false,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      }),
      mockFormMetadata(),
    ]);

    useTextFieldMock.mockReturnValue({
      labelProps: { htmlFor: 'test' },
      inputProps: {
        name: 'test',
        'aria-invalid': true,
        ref: { current: null },
      },
      isInvalid: true,
      errorMessageProps: {
        id: 'error-id',
        children: 'Field is required',
      },
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: ['Field is required'],
      validationDetails: {} as ValidityState,
    });

    const { useTextField } = await import('./useTextField');

    const { result } = renderHook(
      () =>
        useTextField({
          name: 'test',
          label: 'Test Field',
        }),
      { wrapper: HtmlForm },
    );

    expect(result.current.isInvalid).toBe(true);
    expect(result.current.errorMessageProps?.children).toBe(
      'Field is required',
    );
    expect(result.current.inputProps['aria-invalid']).toBe(true);
  });

  test('should associate label and input correctly', async () => {
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      }),
      mockFormMetadata(),
    ]);

    useTextFieldMock.mockReturnValue({
      labelProps: { htmlFor: 'test' },
      inputProps: {
        name: 'test',
        ref: { current: null },
        'aria-invalid': false,
      },
      isInvalid: true,
      errorMessageProps: { id: 'error-id', children: undefined },
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: [],
      validationDetails: {} as ValidityState,
    });

    const { useTextField } = await import('./useTextField');

    const { result } = renderHook(
      () =>
        useTextField({
          name: 'test',
        }),
      { wrapper: HtmlForm },
    );

    expect(result.current.labelProps.htmlFor).toBeDefined();
    expect(result.current.inputProps.name).toBe('test');
    expect(result.current.inputProps['aria-invalid']).toBe(false);
  });

  test('should include aria-describedby when description is provided', async () => {
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      }),
      mockFormMetadata(),
    ]);

    useTextFieldMock.mockReturnValue({
      labelProps: { htmlFor: 'test' },
      inputProps: {
        name: 'test',
        ref: { current: null },
        'aria-describedby': 'desc-id',
      },
      isInvalid: false,
      errorMessageProps: { id: 'error-id', children: undefined },
      descriptionProps: {
        id: 'desc-id',
        children: 'This is a description',
      },
      validationErrors: [],
      validationDetails: {} as ValidityState,
    });

    const { useTextField } = await import('./useTextField');

    const { result } = renderHook(
      () =>
        useTextField({
          name: 'test',
          description: 'This is a description',
        }),
      { wrapper: HtmlForm },
    );

    expect(result.current.inputProps['aria-describedby']).toBe('desc-id');
    expect(result.current.descriptionProps?.children).toBe(
      'This is a description',
    );
  });

  test('should include aria-errormessage when there is an error', async () => {
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        errors: ['Error message'],
        valid: false,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      }),
      mockFormMetadata(),
    ]);

    useTextFieldMock.mockReturnValue({
      labelProps: { htmlFor: 'test' },
      inputProps: {
        name: 'test',
        ref: { current: null },
        'aria-invalid': true,
        'aria-errormessage': 'error-id',
      },
      errorMessageProps: {
        id: 'error-id',
        children: 'Error message',
      },
      isInvalid: true,
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: ['Error message'],
      validationDetails: {} as ValidityState,
    });

    const { useTextField } = await import('./useTextField');

    const { result } = renderHook(
      () =>
        useTextField({
          name: 'test',
        }),
      { wrapper: HtmlForm },
    );

    expect(result.current.inputProps['aria-invalid']).toBe(true);
    expect(result.current.inputProps['aria-errormessage']).toBe('error-id');
    expect(result.current.errorMessageProps?.children).toBe('Error message');
    expect(result.current.errorMessageProps?.id).toBe('error-id');
  });
});
