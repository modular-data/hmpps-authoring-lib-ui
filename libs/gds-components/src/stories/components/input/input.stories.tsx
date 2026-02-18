import { type Meta, type StoryObj } from '@storybook/react';
import { Input, InputWidth } from '../../../components/input';
import { LabelVariant } from '../../../components/label';

const description = `
React implementation of the [GDS Text input component](https://design-system.service.gov.uk/components/text-input/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/input)

## Key Differences from GDS Nunjucks macro

- **Field content**: GDS uses \`text\` or \`html\`, React uses \`children\`
- **Classes**: GDS uses \`classes\`, React uses \`className\`
- **Attributes**: GDS uses an \`attributes\` object, React uses direct native props (with React casing where needed)
- **Prefix/suffix content**: GDS uses \`text\` or \`html\`, React uses \`children\`
- **Prop name mismatches**:
  - \`autocomplete\` -> \`autoComplete\`
  - \`spellcheck\` -> \`spellCheck\`
  - \`inputmode\` -> \`inputMode\`
  - \`label.for\` -> \`label.htmlFor\`
`.trim();

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  args: {
    name: 'example',
    label: { children: 'Example' },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

const simpleLabel = (children: string) => ({ children });

const headingLabel = (children: string) => ({
  children,
  variant: LabelVariant.L,
  isPageHeading: true,
});

const eventNameSharedArgs = {
  id: 'event-name',
  name: 'eventName',
  label: headingLabel('What is the name of the event?'),
};

const eventNameHint = {
  children: 'The name you’ll use on promotional material',
};

const fixedFiveWithoutSpellcheck = {
  width: InputWidth.Fixed5,
  spellCheck: false,
};

const costPerItemSharedArgs = {
  ...fixedFiveWithoutSpellcheck,
  id: 'cost-per-item',
  name: 'costPerItem',
  label: headingLabel('What is the cost per item, in pounds?'),
  prefix: {
    children: '£',
  },
  suffix: {
    children: 'per item',
  },
};

interface WidthExample {
  id: string;
  name: string;
  label: string;
  width: InputWidth;
}

const fixedWidthExamples: WidthExample[] = [
  {
    id: 'width-20',
    name: 'width20',
    label: '20 character width',
    width: InputWidth.Fixed20,
  },
  {
    id: 'width-10',
    name: 'width10',
    label: '10 character width',
    width: InputWidth.Fixed10,
  },
  {
    id: 'width-5',
    name: 'width5',
    label: '5 character width',
    width: InputWidth.Fixed5,
  },
  {
    id: 'width-4',
    name: 'width4',
    label: '4 character width',
    width: InputWidth.Fixed4,
  },
  {
    id: 'width-3',
    name: 'width3',
    label: '3 character width',
    width: InputWidth.Fixed3,
  },
  {
    id: 'width-2',
    name: 'width2',
    label: '2 character width',
    width: InputWidth.Fixed2,
  },
];

const fluidWidthExamples: WidthExample[] = [
  {
    id: 'full',
    name: 'full',
    label: 'Full width',
    width: InputWidth.FluidFull,
  },
  {
    id: 'three-quarters',
    name: 'threeQuarters',
    label: 'Three-quarters width',
    width: InputWidth.FluidThreeQuarters,
  },
  {
    id: 'two-thirds',
    name: 'twoThirds',
    label: 'Two-thirds width',
    width: InputWidth.FluidTwoThirds,
  },
  {
    id: 'one-half',
    name: 'oneHalf',
    label: 'One-half width',
    width: InputWidth.FluidOneHalf,
  },
  {
    id: 'one-third',
    name: 'oneThird',
    label: 'One-third width',
    width: InputWidth.FluidOneThird,
  },
  {
    id: 'one-quarter',
    name: 'oneQuarter',
    label: 'One-quarter width',
    width: InputWidth.FluidOneQuarter,
  },
];

const renderWidthExamples = (examples: WidthExample[]) => (
  <>
    {examples.map((example) => (
      <Input {...example} key={example.id} label={simpleLabel(example.label)} />
    ))}
  </>
);

export const Default: Story = {
  args: eventNameSharedArgs,
};

export const WithoutHeading: Story = {
  args: {
    ...eventNameSharedArgs,
    label: simpleLabel('What is the name of the event?'),
  },
};

export const FixedWidth: Story = {
  render: () => renderWidthExamples(fixedWidthExamples),
};

export const FluidWidth: Story = {
  render: () => renderWidthExamples(fluidWidthExamples),
};

export const HintText: Story = {
  args: {
    ...eventNameSharedArgs,
    hint: eventNameHint,
  },
};

export const NumberInput: Story = {
  args: {
    id: 'account-number',
    name: 'accountNumber',
    label: headingLabel('What is your account number?'),
    hint: {
      children: 'Must be between 6 and 8 digits long',
    },
    width: InputWidth.Fixed10,
    inputMode: 'numeric',
    spellCheck: false,
  },
};

export const DecimalInput: Story = {
  args: {
    id: 'weight',
    name: 'weight',
    label: simpleLabel('Weight, in kilograms'),
    ...fixedFiveWithoutSpellcheck,
    suffix: {
      children: 'kg',
    },
  },
};

export const CodeSequence: Story = {
  args: {
    id: 'authentication-code',
    name: 'authenticationCode',
    label: simpleLabel('Company authentication code'),
    hint: {
      children:
        'This is on the company incorporation letter sent to the registered office address',
    },
    ...fixedFiveWithoutSpellcheck,
    extraLetterSpacing: true,
    defaultValue: 'NC1701',
  },
};

export const PrefixSuffix: Story = {
  args: costPerItemSharedArgs,
};

export const Prefix: Story = {
  args: {
    ...fixedFiveWithoutSpellcheck,
    id: 'cost',
    name: 'cost',
    label: headingLabel('What is the cost in pounds?'),
    prefix: {
      children: '£',
    },
  },
};

export const Suffix: Story = {
  args: {
    ...fixedFiveWithoutSpellcheck,
    id: 'weight',
    name: 'weight',
    label: headingLabel('What is the weight in kilograms?'),
    suffix: {
      children: 'kg',
    },
  },
};

export const AutocompleteAttribute: Story = {
  args: {
    id: 'postcode',
    name: 'postcode',
    label: simpleLabel('Postcode'),
    width: InputWidth.Fixed10,
    autoComplete: 'postal-code',
  },
};

export const SpellcheckDisabled: Story = {
  args: {
    id: 'name',
    name: 'name',
    label: simpleLabel('Reference number'),
    spellCheck: false,
  },
};

export const Error: Story = {
  args: {
    ...eventNameSharedArgs,
    hint: eventNameHint,
    errorMessage: {
      children: 'Enter an event name',
    },
  },
};

export const PrefixSuffixError: Story = {
  args: {
    ...costPerItemSharedArgs,
    errorMessage: {
      children: 'Enter a cost per item, in pounds',
    },
  },
};
