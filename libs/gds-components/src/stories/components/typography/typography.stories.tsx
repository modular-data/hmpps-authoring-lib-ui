import { type Meta, type StoryObj } from '@storybook/react';
import { Typography, TypographyVariant } from '../../../components/typography';

const description = `
React implementation of GDS Typography styles.

**GDS Source**: [govuk-frontend typography](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/core/_typography.scss)

## Documentation

For detailed information about typography usage, see the official GDS documentation:

- [Typeface](https://design-system.service.gov.uk/styles/typeface/)
- [Type scale](https://design-system.service.gov.uk/styles/type-scale/)
- [Headings](https://design-system.service.gov.uk/styles/headings/)
- [Paragraphs](https://design-system.service.gov.uk/styles/paragraphs/)

## Key Differences from GDS

- **Content**: GDS uses classes directly, React uses \`variant\` prop with type-safe enum
- **Component mapping**: Automatically maps variants to appropriate HTML tags (e.g., \`HeadingXL\` → \`<h1>\`, \`Body\` → \`<p>\`)
- **Override**: You can override the HTML tag using the \`component\` prop if needed
- **Aliases**: GDS has aliases like \`govuk-body\` (for \`govuk-body-m\`) and \`govuk-body-lead\` (for \`govuk-body-l\`). We use \`Body\` and \`BodyL\` respectively, omitting duplicate enum values that map to the same underlying GDS class to avoid confusion
`.trim();

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: description,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

const createTypographyStory = (variant: TypographyVariant): Story => ({
  args: {
    variant,
    children: variant,
  },
});

export const HeadingXL = createTypographyStory(TypographyVariant.HeadingXL);
export const HeadingL = createTypographyStory(TypographyVariant.HeadingL);
export const HeadingM = createTypographyStory(TypographyVariant.HeadingM);
export const HeadingS = createTypographyStory(TypographyVariant.HeadingS);
export const CaptionXL = createTypographyStory(TypographyVariant.CaptionXL);
export const CaptionL = createTypographyStory(TypographyVariant.CaptionL);
export const CaptionM = createTypographyStory(TypographyVariant.CaptionM);
export const BodyL = createTypographyStory(TypographyVariant.BodyL);
export const Body = createTypographyStory(TypographyVariant.Body);
export const BodyS = createTypographyStory(TypographyVariant.BodyS);
