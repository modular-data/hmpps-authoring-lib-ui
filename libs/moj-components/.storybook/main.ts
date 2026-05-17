import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { type StorybookConfig } from '@storybook/nextjs';
import { reactDocgenPropFilter } from './config/react-docgen-prop-filter.ts';
import { resolveAssetsDir } from '../src/utils/assets';

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-docs'],
  staticDirs: [
    {
      from: resolveAssetsDir(),
      to: '/assets',
    },
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {
      nextConfigPath: fileURLToPath(
        new URL('./next.config.js', import.meta.url),
      ),
    },
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      shouldExtractValuesFromUnion: false,
      propFilter: reactDocgenPropFilter,
    },
  },
};

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

export default config;
