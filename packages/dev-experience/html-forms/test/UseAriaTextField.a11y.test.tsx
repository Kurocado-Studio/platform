import { useField } from '@conform-to/react';
import { render, screen } from '@kurocado-studio/qa/web';
import React from 'react';
import type { Mock } from 'vitest';

import type { TextFieldProperties } from 'src/types';

import { HtmlForm, useAriaTextField } from '../src';
import { mockFieldMetadata, mockFormMetadata } from '../src/utils';

function UnitTestAriaTextField(properties: TextFieldProperties): React.ReactNode {
  const { labelProps, inputProps, errorMessageProps, descriptionProps } =
    useAriaTextField(properties);

  return (
    <div>
      <label {...labelProps}>{labelProps.children}</label>
      <input {...inputProps} />
      {descriptionProps?.children ? <div {...descriptionProps} /> : undefined}
      {errorMessageProps?.children ? <div {...errorMessageProps} /> : undefined}
    </div>
  );
}

vi.mock('@conform-to/react', async () => {
  return {
    ...(await vi.importActual('@conform-to/react')),
    useField: vi.fn(),
    useInputControl: vi.fn(),
  };
});

describe('useAriaTextField Hook - Accessibility Tests', () => {
  const useFieldMock = useField as Mock<typeof useField>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should associate label and input correctly', () => {
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
      }),
      mockFormMetadata(),
    ]);

    render(
      <HtmlForm>
        <UnitTestAriaTextField name='test' label='Test Label' />
      </HtmlForm>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
  });

  it('should include aria-describedby when description is provided', () => {
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
      }),
      mockFormMetadata(),
    ]);

    render(
      <HtmlForm>
        <UnitTestAriaTextField
          name='test'
          label='Test Label'
          description='This is a description'
        />
      </HtmlForm>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('aria-describedby', 'desc-id');

    const description = screen.getByText('This is a description');
    expect(description).toBeInTheDocument();
    expect(description.id).toBe('desc-id');
  });

  it('should include aria-errormessage when there is an error', () => {
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        errors: ['Error message'],
        valid: false,
        descriptionId: 'desc-id',
        errorId: 'error-id',
      }),
      mockFormMetadata(),
    ]);

    render(
      <HtmlForm>
        <UnitTestAriaTextField name='test' label='Test Label' />
      </HtmlForm>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-errormessage', 'Error message');

    const errorMessage = screen.getByText('Error message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.id).toBe('error-id');
  });
});
