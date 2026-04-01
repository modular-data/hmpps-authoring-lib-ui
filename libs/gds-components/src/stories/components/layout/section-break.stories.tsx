import { type Meta, type StoryObj } from '@storybook/react';
import { SectionBreak, SectionBreakSize } from '../../../components/layout';

const description = `
React wrapper for the [GDS Section break style](https://design-system.service.gov.uk/styles/section-break/).

This story matches the single official GDS example, which shows visible section breaks at extra large, large, medium and default spacing.
`.trim();

const meta = {
  title: 'Components/Layout/SectionBreak',
  component: SectionBreak,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta<typeof SectionBreak>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllExamples: Story = {
  render: () => (
    <>
      <SectionBreak size={SectionBreakSize.ExtraLarge} visible />
      <SectionBreak size={SectionBreakSize.Large} visible />
      <SectionBreak size={SectionBreakSize.Medium} visible />
      <SectionBreak visible />
    </>
  ),
};
