import { type Meta, type StoryObj } from '@storybook/react';
import { Hint } from '../../../components/hint';

const description = `
React implementation of the [GDS Hint component](https://design-system.service.gov.uk/components/text-input/#hint-text).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/hint)

## Key Differences from GDS Nunjucks macro

- **Content**: GDS uses \`text\` or \`html\` params, React uses \`children\` prop
- **Classes**: GDS uses \`classes\` param, React uses \`className\` prop
- **Props**: GDS uses explicit \`attributes\` params, React uses native React HTML attributes with props spreading
`.trim();

const meta = {
  title: 'Components/Hint',
  component: Hint,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  args: {
    id: 'hint-id',
    children: 'Example hint text to help users understand what to enter',
  },
} satisfies Meta<typeof Hint>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
