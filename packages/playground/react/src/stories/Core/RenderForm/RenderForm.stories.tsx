import type { Meta, StoryObj } from '@storybook/react';

import { customer, customerWizard } from './forms';
import RenderFormApp from './RenderForm';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Core/RenderForm',
  component: RenderFormApp,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof RenderFormApp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Customer: Story = {
  args: {
    uiSchema: customer.uiSchema!,
    data: customer.data!,
  },
};

export const CustomerWizard: Story = {
  args: {
    uiSchema: customerWizard.uiSchema!,
    data: customerWizard.data!,
  },
};
