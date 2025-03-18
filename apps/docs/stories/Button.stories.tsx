import { Button, type ButtonProps } from '@kurocado-studio/ui';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<ButtonProps> = {
  component: Button,
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['button', 'submit', 'reset'],
    },
  },
};

/* eslint import/no-default-export: 0 */
export default meta;

type Story = StoryObj<ButtonProps>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props: ButtonProps) => (
    <Button
      {...props}
      onClick={(): void => {
        // eslint-disable-next-line no-alert -- alert for demo
        alert('Hello from Turborepo!');
      }}
    >
      {props.children}
    </Button>
  ),
  name: 'Button',
  args: {
    children: 'Hello',
    type: 'button',
    style: {
      color: 'blue',
      border: '1px solid gray',
      padding: 10,
      borderRadius: 10,
    },
  },
};
