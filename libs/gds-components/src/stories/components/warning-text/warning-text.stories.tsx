import { type Meta, type StoryObj } from '@storybook/react';
import { WarningText } from '../../../components/warning-text';

const description = `
React implementation of the [GDS Warning text component](https://design-system.service.gov.uk/components/warning-text/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/warning-text)

## Key Differences from GDS Nunjucks macro

- **Content**: GDS uses \`text\` or \`html\`, React uses \`children\`
- **Classes**: GDS uses \`classes\`, React uses \`className\`
- **Attributes**: GDS uses \`attributes\`, React uses native props spreading
`.trim();

const meta = {
  title: 'Components/WarningText',
  component: WarningText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  args: {
    children: 'You can be fined up to £5,000 if you do not register.',
  },
} satisfies Meta<typeof WarningText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
