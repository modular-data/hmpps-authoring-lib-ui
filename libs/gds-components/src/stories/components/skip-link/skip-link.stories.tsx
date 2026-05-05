import { type Meta, type StoryObj } from '@storybook/react';
import { SkipLink } from '../../../components/skip-link';

const description = `
React implementation of the [GDS Skip link component](https://design-system.service.gov.uk/components/skip-link/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/skip-link)

## Implementation note

This component currently renders the GOV.UK skip link markup only. GOV.UK Frontend skip-link JavaScript, which moves focus to the target element for improved screen reader announcements, is planned for a later enhancement.

## Key Differences from GDS Nunjucks macro

- **Content**: GDS uses \`text\` or \`html\`, React uses \`children\`
- **Classes**: GDS uses \`classes\`, React uses \`className\`
- **Attributes**: GDS uses \`attributes\`, React uses native props spreading
`.trim();

const meta = {
  title: 'Components/SkipLink',
  component: SkipLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta<typeof SkipLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
