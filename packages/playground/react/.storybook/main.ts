import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/**/!(stories__examples)/*.mdx',
    '../src/**/!(stories__examples)/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath("@storybook/addon-docs"),
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
