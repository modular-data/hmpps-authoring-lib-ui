import { type Meta, type StoryObj } from '@storybook/react';
import { Footer } from '../../../components/footer';
import {
  defaultWidthNavigationOneColumn,
  defaultWidthNavigationTwoColumns,
  fullGdsMeta,
  fullGdsNavigation,
  magicalLawMeta,
  metaLinksOnly,
  navigationExample,
  prototypeKitMeta,
  threeEqualColumnsNavigation,
  welshContentLicence,
  welshCopyright,
} from './footer.stories-data';
import { rebrandHtmlClassDecorator } from '../../helpers/rebrand-html-class-decorator';

const description = `
React implementation of the [GOV.UK Footer component](https://design-system.service.gov.uk/components/footer/) as shipped in GOV.UK Frontend v5.14.0.

**GDS Source**: [govuk-frontend v5.14.0 footer template](https://github.com/alphagov/govuk-frontend/tree/v5.14.0/packages/govuk-frontend/src/govuk/components/footer)

## Key Differences from GDS Nunjucks macro

- **Link content API**: GDS uses \`text\`, React uses \`children\`
- **Custom meta/content API**: GDS uses \`text\` or \`html\`, React uses \`children\` and \`ReactNode\`
- **Content licence visibility**: GDS hides the licence block only when \`contentLicence\` is \`null\`; React also hides it for other falsy values such as \`false\` from conditional rendering
- **Link attributes**: GDS uses \`attributes\`, React uses native link props on each footer item
- **Container classes**: GDS uses \`containerClasses\`, React uses \`containerClassName\`
- **Root classes and attributes**: GDS uses \`classes\` and \`attributes\`, React uses \`className\` and native props

The \`rebrand\` examples also need the \`govuk-template--rebranded\` class on the outer \`html\` element. These stories add that class with a decorator.
`.trim();

const meta = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomContentLicenceAndCopyright: Story = {
  args: {
    contentLicence: welshContentLicence,
    copyright: welshCopyright,
  },
};

export const WithNoContentLicence: Story = {
  args: {
    contentLicence: null,
  },
};

export const WithCustomMeta: Story = {
  args: {
    meta: prototypeKitMeta,
  },
};

export const WithOnlyCustomMeta: Story = {
  args: {
    meta: prototypeKitMeta,
    contentLicence: null,
  },
};

export const WithMetaLinksAndContent: Story = {
  args: {
    meta: magicalLawMeta,
  },
};

export const WithOnlyMetaLinks: Story = {
  args: {
    meta: metaLinksOnly,
    contentLicence: null,
  },
};

export const WithDefaultWidthNavigationOneColumn: Story = {
  args: {
    navigation: defaultWidthNavigationOneColumn,
  },
};

export const WithDefaultWidthNavigationTwoColumns: Story = {
  args: {
    navigation: defaultWidthNavigationTwoColumns,
  },
};

export const WithNavigation: Story = {
  args: {
    navigation: navigationExample,
  },
};

export const FullGdsExample: Story = {
  args: {
    navigation: fullGdsNavigation,
    meta: fullGdsMeta,
  },
};

export const ThreeEqualColumns: Story = {
  args: {
    navigation: threeEqualColumnsNavigation,
  },
};

export const Rebrand: Story = {
  args: {
    rebrand: true,
  },
  decorators: [rebrandHtmlClassDecorator],
};
