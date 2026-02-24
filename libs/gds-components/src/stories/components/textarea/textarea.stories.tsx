import { type Meta, type StoryObj } from '@storybook/react';
import { LabelVariant } from '../../../components/label';
import { Textarea } from '../../../components/textarea';
import { createAutoCapitalizeArgType } from '../../helpers/arg-types';

const description = `
React implementation of the [GDS Textarea component](https://design-system.service.gov.uk/components/textarea/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/textarea)

## Key Differences from GDS Nunjucks macro

- **Field content**: GDS uses \`text\` or \`html\`, React uses \`children\`
- **Classes**: GDS uses \`classes\`, React uses \`className\`
- **Attributes**: GDS uses \`attributes\`, React uses native props spreading
- **GDS docs mismatch**: docs options imply \`label.for\`, \`hint.id\`, and \`errorMessage.id\` are overridable, but the original templates derive them from field \`id\`/\`name\` and ignore overrides. This implementation follows template behavior exactly.
`.trim();

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  argTypes: {
    autoCapitalize: createAutoCapitalizeArgType(),
  },
  args: {
    name: 'moreDetail',
    id: 'more-detail',
    label: {
      children: 'Can you provide more detail?',
      variant: LabelVariant.L,
      isPageHeading: true,
    },
    hint: {
      children:
        'Do not include personal or financial information, like your National Insurance number or credit card details',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SpecifyingRows: Story = {
  args: {
    rows: 8,
  },
};

export const WithoutHeading: Story = {
  args: {
    label: {
      children: 'Can you provide more detail?',
    },
    hint: undefined,
  },
};

export const Error: Story = {
  args: {
    errorMessage: {
      children: 'Enter more detail',
    },
  },
};
