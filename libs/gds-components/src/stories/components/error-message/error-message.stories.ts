import { type Meta, type StoryObj } from '@storybook/react';
import { ErrorMessage } from '../../../components/error-message';

const description = `
React implementation of the [GDS Error Message component](https://design-system.service.gov.uk/components/error-message/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/error-message)

## Key Differences from GDS Nunjucks macro

- **Content**: GDS uses \`text\` or \`html\` params, React uses \`children\` prop
- **Classes**: GDS uses \`classes\` param, React uses \`className\` prop
- **Props**: GDS uses explicit \`attributes\` params, React uses native React HTML attributes with props spreading
`.trim();

const meta = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  args: {
    id: 'error-message-id',
    children: 'Full name must be 2 characters or more',
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
