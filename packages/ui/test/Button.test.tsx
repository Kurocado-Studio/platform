import { ReactTestingLibrary } from '@kurocado-studio/qa';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Button } from 'src/Button';

const { render, screen } = ReactTestingLibrary;

describe('Button', () => {
  it('should render with the provided children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should pass additional props to the button element', () => {
    render(
      <Button id='test-button' data-testid='button-test'>
        Click Me
      </Button>,
    );
    const button = screen.getByTestId('button-test');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('id', 'test-button');
  });

  it('should have type="button" by default', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});
