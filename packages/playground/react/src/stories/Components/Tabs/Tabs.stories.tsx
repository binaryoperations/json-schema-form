import { Tabs } from '@binaryoperations/json-forms-react/components/Semantic/Tabs';
import type { Meta, StoryObj } from '@storybook/react';

import { tabNodes, tabs } from './tabData';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  args: {
    tabs,
    children: tabNodes,
  },
};

export const WithDefaultValue: Story = {
  args: {
    tabs,
    children: tabNodes,
    defaultValue: 2,
  },
};

export const Controlled: Story = {
  args: {
    tabs,
    children: tabNodes,
    value: 3,
  },
};

export const MultipleActivated: Story = {
  args: {
    tabs,
    children: tabNodes,
    multiple: true,
    value: [2, 3],
  },
};

export const LeftPositioned: Story = {
  args: {
    tabs,
    children: tabNodes,
    position: 'left',
    tabListProps: { style: { maxWidth: 250 } },
    value: 3,
  },
};

export const RightPositioned: Story = {
  args: {
    tabs,
    children: tabNodes,
    position: 'right',
    tabListProps: { style: { maxWidth: 250 } },
    value: 3,
  },
};

export const BottomPositioned: Story = {
  args: {
    tabs,
    children: tabNodes,
    position: 'bottom',
    tabListProps: { style: { maxWidth: 250 } },
    value: 3,
  },
};
