import { type Meta, type StoryObj } from '@storybook/react';
import { Header } from '../../../components/header';
import { rebrandHtmlClassDecorator } from '../../helpers/rebrand-html-class-decorator';

const description = `
React implementation of the [GOV.UK Header component](https://design-system.service.gov.uk/components/header/) as shipped in GOV.UK Frontend v5.14.0.

**GDS Source**: [govuk-frontend v5.14.0 header template](https://github.com/alphagov/govuk-frontend/tree/v5.14.0/packages/govuk-frontend/src/govuk/components/header)

## Key Differences from GDS Nunjucks macro

- **Navigation content API**: GDS uses \`text\` or \`html\`, React uses \`children\`
- **Navigation item attributes**: GDS uses \`attributes\`, React spreads native Next.js \`Link\` props on each navigation item (same shape as \`HeaderNavigationItem\`)
- **Container classes**: GDS uses \`containerClasses\`, React uses \`containerClassName\`
- **Navigation classes**: GDS uses \`navigationClasses\`, React uses \`navigationClassName\`
- **Root classes and attributes**: GDS uses \`classes\` and \`attributes\`, React uses \`className\` and native props

## Implementation note

This component currently renders the GOV.UK header markup only. GOV.UK Frontend header JavaScript, which reveals and collapses the mobile navigation menu, updates \`aria-expanded\`, and adds the JavaScript navigation modifier class, is planned for a later enhancement.

The \`rebrand\` examples also need the \`govuk-template--rebranded\` class on the outer \`html\` element. These stories add that class with a decorator.
`.trim();

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Rebrand: Story = {
  args: {
    rebrand: true,
  },
  decorators: [rebrandHtmlClassDecorator],
};
