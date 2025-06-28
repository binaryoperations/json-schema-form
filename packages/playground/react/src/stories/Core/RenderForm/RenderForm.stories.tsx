import type { Meta, StoryObj } from '@storybook/react';
import { PropsWithChildren } from 'react';

import { composite, customer, customerWizard, frozenArray, responsive } from './forms';
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
    schema: customer.schema,
  },
};

export const CustomerWizard: Story = {
  args: {
    schema: customer.schema,
    uiSchema: customerWizard.uiSchema,
    data: customerWizard.data!,
  },
};

export const CustomerWizardWithCustomUiSchema: Story = {
  args: {
    schema: customer.schema,
    uiSchema: {
      type: 'rows',
      nodes: [
        {
          type: 'testCustomLayout',
          nodes: (customerWizard.uiSchema)!.nodes,
        },
        {
          nodes: (customerWizard.uiSchema)!.nodes,
          type: (props: PropsWithChildren) => (
            <div>
              <h4>I'm another special snowflake</h4>
              {props.children}
            </div>
          ),
        },
      ],
    },
    data: customerWizard.data!,
  },
};

export const Responsive: Story = {
  args: {
    schema: responsive.schema,
    uiSchema: {
      type: 'rows',
      nodes: [
        {
          type: 'testCustomLayout',
          nodes: (responsive.uiSchema)!.nodes,
        },
        {
          nodes: (responsive.uiSchema)!.nodes,
          type: (props: PropsWithChildren) => (
            <div>
              <h4>I'm another special snowflake</h4>
              {props.children}
            </div>
          ),
        },
      ],
    },
    data: responsive.data!,
  },
};

export const Composite: Story = {
  args: {
    schema: composite.schema,
    uiSchema: composite.uiSchema,
    data: composite.data!,
  },
};

export const FrozenArray: Story = {
  args: {
    schema: frozenArray.schema,
    uiSchema: frozenArray.uiSchema,
    data: frozenArray.data,
  },
}
