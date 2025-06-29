import {
  Accordion,
  type AccordionPropsBase,
} from '@binaryoperations/json-forms-react/components/Semantic/Accordion';
import { ActiveStateProps } from '@binaryoperations/json-forms-react/context/ActiveStateContext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC } from 'react';

import { items } from './accordionData';

type AccordionComponent = FC<AccordionPropsBase & ActiveStateProps>;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Accordion',
  component: Accordion as AccordionComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<AccordionComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  args: {
    items,
  },
};

export const WithDefaultValue: Story = {
  args: {
    items,
    defaultValue: 2,
  },
};

export const Controlled: Story = {
  args: {
    items,
    value: 3,
  },
};

export const MultipleActivated: Story = {
  args: {
    items,
    multiple: true,
    value: [2, 3],
  },
};
