import { type Meta, type StoryObj } from '@storybook/react';
import { Fieldset, FieldsetLegendVariant } from '../../../components/fieldset';
import { Input, InputWidth } from '../../../components/input';

const description = `
React implementation of the [GDS Fieldset component](https://design-system.service.gov.uk/components/fieldset/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/fieldset)

## Key Differences from GDS Nunjucks macro

- **Legend content**: GDS uses \`legend.text\` or \`legend.html\`, React uses \`legend.children\`
- **Legend classes**: GDS uses \`legend.classes\`, React uses \`legend.className\` and a type-safe \`legend.variant\`
- **Fieldset classes**: GDS uses \`classes\`, React uses \`className\`
- **Fieldset content**: GDS uses \`html\` or \`call\` blocks, React uses \`children\`
- **Attributes**: GDS has explicit \`attributes\` and \`describedBy\`, React uses native fieldset attributes (for example \`aria-describedby\`)
`.trim();

const meta = {
  title: 'Components/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta<typeof Fieldset>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderAddressFields = (idPrefix: string) => (
  <>
    <Input
      id={`${idPrefix}-line-1`}
      name={`${idPrefix}Line1`}
      label={{ children: 'Address line 1' }}
      autoComplete="address-line1"
    />
    <Input
      id={`${idPrefix}-line-2`}
      name={`${idPrefix}Line2`}
      label={{ children: 'Address line 2 (optional)' }}
      autoComplete="address-line2"
    />
    <Input
      id={`${idPrefix}-town`}
      name={`${idPrefix}Town`}
      label={{ children: 'Town or city' }}
      width={InputWidth.FluidTwoThirds}
      autoComplete="address-level2"
    />
    <Input
      id={`${idPrefix}-postcode`}
      name={`${idPrefix}Postcode`}
      label={{ children: 'Postcode' }}
      width={InputWidth.Fixed10}
      autoComplete="postal-code"
    />
  </>
);

export const Default: Story = {
  args: {
    legend: {
      children: 'What is your address?',
      variant: FieldsetLegendVariant.L,
      isPageHeading: true,
    },
    children: renderAddressFields('address'),
  },
};
