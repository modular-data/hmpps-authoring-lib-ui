import { type Meta, type StoryObj } from '@storybook/react';
import { InsetText } from '../../../components/inset-text';

const description = `
React implementation of the [GDS Inset text component](https://design-system.service.gov.uk/components/inset-text/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/inset-text)

## Key Differences from GDS Nunjucks macro

- **Content**: GDS uses \`text\`, \`html\`, or a \`call\` block, React uses \`children\`
- **Classes**: GDS uses \`classes\`, React uses \`className\`
- **Attributes**: GDS uses an \`attributes\` object, React uses native props spreading
`.trim();

const meta = {
  title: 'Components/InsetText',
  component: InsetText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  args: {
    children:
      'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.',
  },
} satisfies Meta<typeof InsetText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
