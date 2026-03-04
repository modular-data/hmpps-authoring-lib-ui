import { type Meta, type StoryObj } from '@storybook/react';
import { Link } from '../../../components/link';
import { inverseBackgroundDecorator } from '../../helpers/inverse-background-decorator';

const description = `
React implementation of [GDS Link styles](https://design-system.service.gov.uk/styles/links/).

**GDS Source**: [govuk-frontend styles](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/core/_links.scss)

## Key Differences from GDS Nunjucks macro

- **Macro model**: GDS links are documented as style examples rather than a dedicated macro, but React implementation provides a reusable component API
- **Rendering**: GDS examples use raw \`<a>\`, React uses Next.js \`Link\`
- **Modifiers**: GDS examples add modifier classes manually, React exposes \`noVisitedState\`, \`noUnderline\` and \`isInverse\` props
- **New tab security**: when \`target="_blank"\`, component defaults \`rel\` to \`noreferrer noopener\` unless \`rel\` is explicitly provided
- **Attributes**: GDS uses plain HTML attributes, React uses typed props with native prop spreading
`.trim();

const BASE_LINK_TEXT = 'link text';

const meta = {
  title: 'Components/Link',
  component: Link,
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
    children: BASE_LINK_TEXT,
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoVisitedState: Story = {
  args: {
    noVisitedState: true,
    children: `${BASE_LINK_TEXT} (with no visited state)`,
  },
};

export const OpeningInNewTab: Story = {
  args: {
    target: '_blank',
    children: `${BASE_LINK_TEXT} (opens in new tab)`,
  },
};

export const NoUnderline: Story = {
  args: {
    noUnderline: true,
    children: `${BASE_LINK_TEXT} (with no underline)`,
  },
};

export const OnDarkBackground: Story = {
  decorators: [inverseBackgroundDecorator],
  args: {
    isInverse: true,
    children: `${BASE_LINK_TEXT} (on dark background)`,
  },
};
