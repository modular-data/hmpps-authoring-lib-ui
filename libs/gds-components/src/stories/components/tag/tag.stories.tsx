import { type Meta, type StoryObj } from '@storybook/react';
import { Tag, TagColour } from '../../../components/tag';

const description = `
React implementation of the [GDS Tag component](https://design-system.service.gov.uk/components/tag/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/tag)

## Key Differences from GDS Nunjucks macro

- **Content**: GDS uses \`text\` or \`html\` params, React uses \`children\` prop
- **Classes**: GDS uses \`classes\` param, React uses \`className\` prop
- **Colours**: React provides a type-safe \`colour\` enum for tag class variants
`.trim();

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  args: {
    children: 'Active',
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

const titleByColour: Record<TagColour, string> = {
  [TagColour.Grey]: 'Inactive',
  [TagColour.Green]: 'New',
  [TagColour.Teal]: 'Active',
  [TagColour.Blue]: 'Pending',
  [TagColour.Purple]: 'Received',
  [TagColour.Magenta]: 'Sent',
  [TagColour.Red]: 'Rejected',
  [TagColour.Orange]: 'Declined',
  [TagColour.Yellow]: 'Delayed',
};

const createStoryByColour = (colour: TagColour): Story => ({
  args: {
    colour,
    children: titleByColour[colour],
  },
});

export const Default: Story = {};
export const Grey = createStoryByColour(TagColour.Grey);
export const Green = createStoryByColour(TagColour.Green);
export const Teal = createStoryByColour(TagColour.Teal);
export const Blue = createStoryByColour(TagColour.Blue);
export const Purple = createStoryByColour(TagColour.Purple);
export const Magenta = createStoryByColour(TagColour.Magenta);
export const Red = createStoryByColour(TagColour.Red);
export const Orange = createStoryByColour(TagColour.Orange);
export const Yellow = createStoryByColour(TagColour.Yellow);
