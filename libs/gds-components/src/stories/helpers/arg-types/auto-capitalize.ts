import { type ArgTypes } from '@storybook/react';

const autoCapitalizeOptions = [
  'off',
  'none',
  'on',
  'sentences',
  'words',
  'characters',
] as const;

export const createAutoCapitalizeArgType = (): ArgTypes['autoCapitalize'] => ({
  control: { type: 'select' },
  options: autoCapitalizeOptions,
  description:
    'Controls mobile keyboard auto-capitalization for text entry fields.',
});
