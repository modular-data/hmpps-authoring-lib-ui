import { type Meta, type StoryObj } from '@storybook/react';
import { Label, LabelVariant } from '../../../components/label';

const description = `
React implementation of the GDS Label component.

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/label)

## Key Differences from GDS Nunjucks macro

- **Content**: GDS uses \`text\` or \`html\` params, React uses \`children\` prop
- **for attribute**: GDS uses \`for\`, React uses \`htmlFor\`
- **Classes**: GDS uses \`classes\` param, React uses \`className\` prop
- **Props**: GDS uses explicit \`attributes\` params, React uses native React HTML attributes with props spreading
- **Variants**: React adds a type-safe \`variant\` prop for GOV.UK label sizes
`.trim();

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
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
