import { type Meta, type StoryObj } from '@storybook/react';
import { VisuallyHidden } from '../../../components/layout';
import { Typography } from '../../../components/typography';

const description = `
Official examples for visually hidden content from [GDS Layout](https://design-system.service.gov.uk/styles/layout/#hide-elements-and-keep-them-accessible-to-screen-readers).

Includes the focusable variant for keyboard users.
`.trim();

const meta = {
  title: 'Components/Layout/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: ' (opens in a new tab)',
    focusable: false,
  },
  render: (args) => (
    <Typography>
      Read the guidance
      <VisuallyHidden {...args} />
    </Typography>
  ),
};

export const Focusable: Story = {
  args: {
    children: 'Skip to main content',
    focusable: true,
    tabIndex: 0,
  },
};
