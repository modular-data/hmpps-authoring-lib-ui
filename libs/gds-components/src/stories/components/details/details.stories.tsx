import { type Meta, type StoryObj } from '@storybook/react';
import { Details } from '../../../components/details';

const description = `
React implementation of the [GDS Details component](https://design-system.service.gov.uk/components/details/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/details)

## Key Differences from GDS Nunjucks macro

- **Summary content**: GDS uses \`summaryText\` or \`summaryHtml\`, React uses \`summary\`
- **Body content**: GDS uses \`text\`, \`html\`, or a \`call\` block, React uses \`children\`
- **Container classes**: GDS uses \`classes\`, React uses \`className\`
- **Attributes**: GDS uses \`attributes\`, React uses native props spreading
`.trim();

const meta = {
  title: 'Components/Details',
  component: Details,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  args: {
    summary: 'Help with nationality',
    children:
      "We need to know your nationality so we can work out which elections you're entitled to vote in. If you cannot provide your nationality, you'll have to send copies of identity documents through the post.",
  },
} satisfies Meta<typeof Details>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
