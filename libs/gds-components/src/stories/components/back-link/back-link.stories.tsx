import { type Meta, type StoryObj } from '@storybook/react';
import { BackLink } from '../../../components/back-link';
import { inverseBackgroundDecorator } from '../../helpers/inverse-background-decorator';

const description = `
React implementation of the [GDS Back link component](https://design-system.service.gov.uk/components/back-link/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/back-link)

## Key Differences from GDS Nunjucks macro

- **Content**: GDS uses \`text\` or \`html\`, React uses \`children\`
- **Classes**: GDS uses \`classes\`, React uses \`className\`
- **Attributes**: GDS uses \`attributes\`, React uses native props spreading
- **Inverse style**: GDS uses \`govuk-back-link--inverse\` class directly, React exposes \`isInverse\`
`.trim();

const meta = {
  title: 'Components/BackLink',
  component: BackLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  args: {
    href: '#',
  },
} satisfies Meta<typeof BackLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inverse: Story = {
  decorators: [inverseBackgroundDecorator],
  args: {
    isInverse: true,
  },
};
