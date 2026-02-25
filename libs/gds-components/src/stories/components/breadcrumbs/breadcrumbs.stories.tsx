import { type Meta, type StoryObj } from '@storybook/react';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { inverseBackgroundDecorator } from '../../helpers/inverse-background-decorator';

const description = `
React implementation of the [GDS Breadcrumbs component](https://design-system.service.gov.uk/components/breadcrumbs/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/breadcrumbs)

## Key Differences from GDS Nunjucks macro

- **Item content**: GDS uses \`text\` or \`html\`, React uses \`children\`
- **Container classes**: GDS uses \`classes\`, React uses \`className\`
- **Attributes**: GDS uses \`attributes\`, React uses native props spreading
- **Item attributes**: GDS uses \`item.attributes\`, React uses native link props on items with \`href\`
- **Inverse style**: GDS uses \`govuk-breadcrumbs--inverse\` class directly, React exposes \`isInverse\`
`.trim();

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  args: {
    items: [
      { children: 'Home', href: '#' },
      { children: 'Passports, travel and living abroad', href: '#' },
      { children: 'Travel abroad', href: '#' },
    ],
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CollapseOnMobile: Story = {
  args: {
    collapseOnMobile: true,
    items: [
      { children: 'Home', href: '#' },
      { children: 'Environment', href: '#' },
      { children: 'Rural and countryside', href: '#' },
      { children: 'Rural development and land management', href: '#' },
      { children: 'Economic growth in rural areas', href: '#' },
    ],
  },
};

export const Inverse: Story = {
  decorators: [inverseBackgroundDecorator],
  args: {
    isInverse: true,
  },
};
