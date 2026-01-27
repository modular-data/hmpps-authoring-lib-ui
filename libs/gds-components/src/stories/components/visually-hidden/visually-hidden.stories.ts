import { type Meta, type StoryObj } from '@storybook/react';
import { VisuallyHidden } from '../../../components/visually-hidden';

const meta = {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  args: {
    children: 'Some screen reader hint',
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
