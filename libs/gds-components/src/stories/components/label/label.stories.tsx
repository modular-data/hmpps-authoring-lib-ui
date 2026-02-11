import { type Meta, type StoryObj } from '@storybook/react';
import { Label, LabelVariant } from '../../../components/label';

const meta = {
  title: 'Components/Label',
  component: Label,
  args: {
    children: 'What is the name of the event?',
    htmlFor: 'event-name',
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const XL: Story = {
  args: {
    variant: LabelVariant.XL,
  },
};

export const L: Story = {
  args: {
    variant: LabelVariant.L,
  },
};

export const M: Story = {
  args: {
    variant: LabelVariant.M,
  },
};

export const S: Story = {
  args: {
    variant: LabelVariant.S,
  },
};
