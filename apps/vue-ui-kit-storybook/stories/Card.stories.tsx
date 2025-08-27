/* eslint import/no-default-export: 0 */
import { Card, CardBody } from '@kurocado-studio/vue-ui-kit';
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    onClick: fn(),
  },
} satisfies Meta<Record<string, unknown>>;

export default meta;

type Story = StoryObj<Record<string, unknown>>;

const template = `
<Card v-bind="args">
  <CardBody>
    <p class="text-sm">Card Body</p>
  </CardBody>
</Card>
`;

export const Default: Story = {
  render: (args: Record<string, unknown>) => ({
    components: { Card, CardBody },
    setup() {
      return { args };
    },
    template,
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>${template}</template>`,
      },
    },
  },
};
