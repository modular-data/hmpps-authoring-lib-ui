import { type Meta, type StoryObj } from '@storybook/react';
import { GovukLogo } from '../../../components/govuk-logo';

const description = `
React implementation of the internal GOV.UK logo SVG extracted for reuse in header and footer components.

There are no official standalone GOV.UK Design System examples for this logo, so Storybook only includes a simple default rendering.
`.trim();

const meta = {
  title: 'Components/GovukLogo',
  component: GovukLogo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta<typeof GovukLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
