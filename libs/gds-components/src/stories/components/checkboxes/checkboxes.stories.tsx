import { type ComponentProps, useId } from 'react';
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks';
import { type Meta, type StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { Checkboxes } from '../../../components/checkboxes';
import { FieldsetLegendVariant } from '../../../components/fieldset';
import {
  contactItems,
  countriesItems,
  nationalityItems,
  organisationItems,
  wasteItems,
} from './checkboxes.story-data';

type CheckboxesStoryProps = ComponentProps<typeof Checkboxes>;
type CheckboxesOnValuesChange = NonNullable<
  CheckboxesStoryProps['onValuesChange']
>;

const description = `
React implementation of the [GDS Checkboxes component](https://design-system.service.gov.uk/components/checkboxes/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/checkboxes)

## Key Differences from GDS Nunjucks macro

- **Field content**: GDS uses \`text\` or \`html\`, React uses \`children\`
- **Classes**: GDS uses \`classes\`, React uses \`className\`
- **Attributes**: GDS uses \`attributes\`, React uses native props spreading
- **Conditional content**: GDS uses \`conditional.html\`, React uses \`conditional\` with React nodes
- **Conditional reveal wiring**: GOV.UK Frontend bootstraps reveals from \`data-aria-controls\`; this component renders \`aria-controls\` and \`aria-expanded\` directly from React state
- **Controlled updates**: React uses \`onValuesChange(nextValues)\` for parent state updates
- **Exclusive scope (intentional)**: GOV.UK frontend JavaScript can target same-name checkboxes across the document/form. This React component applies \`behaviour: 'exclusive'\` only within the current \`Checkboxes\` instance so state remains local and predictable.
- **Parent sync rule**: if \`item.checked\` and \`values\` are both used, parent must keep both in sync
`.trim();

const RenderInteractiveCheckboxes = (args: CheckboxesStoryProps) => {
  const [, updateArgs] = useArgs<CheckboxesStoryProps>();
  const generatedIdPrefix = useId();
  const resolvedIdPrefix = args.idPrefix || `${args.name}-${generatedIdPrefix}`;

  const handleValuesChange: CheckboxesOnValuesChange = (nextValues, meta) => {
    args.onValuesChange?.(nextValues, meta);
    updateArgs({ values: nextValues });
  };

  return (
    <Checkboxes
      {...args}
      idPrefix={resolvedIdPrefix}
      onValuesChange={handleValuesChange}
    />
  );
};

const meta = {
  title: 'Components/Checkboxes',
  component: Checkboxes,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
      description: {
        component: description,
      },
    },
  },
  render: RenderInteractiveCheckboxes,
} satisfies Meta<typeof Checkboxes>;

export default meta;

type Story = StoryObj<typeof meta>;

const wasteStoryArgs: Story['args'] = {
  name: 'waste',
  fieldset: {
    legend: {
      children: 'Which types of waste do you transport?',
      isPageHeading: true,
      variant: FieldsetLegendVariant.L,
    },
  },
  hint: {
    children: 'Select all that apply',
  },
  items: wasteItems,
};

const nationalityStoryArgs: Story['args'] = {
  name: 'nationality',
  fieldset: {
    legend: {
      children: 'What is your nationality?',
      isPageHeading: true,
      variant: FieldsetLegendVariant.L,
    },
  },
  hint: {
    children:
      'If you have dual nationality, select all options that are relevant to you.',
  },
  items: nationalityItems,
};

const countriesStoryArgs: Story['args'] = {
  name: 'countries',
  fieldset: {
    legend: {
      children: 'Will you be travelling to any of these countries?',
      isPageHeading: true,
      variant: FieldsetLegendVariant.L,
    },
  },
  items: countriesItems,
};

export const Default: Story = {
  args: wasteStoryArgs,
};

export const WithoutHeading: Story = {
  args: {
    ...wasteStoryArgs,
    fieldset: {
      legend: {
        children: 'Which types of waste do you transport?',
      },
    },
  },
};

export const Hint: Story = {
  args: nationalityStoryArgs,
};

export const WithNoneOption: Story = {
  args: {
    ...countriesStoryArgs,
    hint: {
      children: 'Select all countries that apply',
    },
  },
};

export const WithNoneOptionInError: Story = {
  args: {
    ...countriesStoryArgs,
    values: ['france', 'none'],
    errorMessage: {
      children:
        'Select countries you will be travelling to, or select ‘No, I will not be travelling to any of these countries’',
    },
    items: countriesItems,
  },
};

export const ConditionalReveal: Story = {
  args: {
    name: 'contact',
    fieldset: {
      legend: {
        children: 'How would you like to be contacted?',
        isPageHeading: true,
        variant: FieldsetLegendVariant.L,
      },
    },
    hint: {
      children: 'Select all options that are relevant to you',
    },
    items: contactItems,
  },
};

export const Small: Story = {
  args: {
    name: 'organisation',
    className: 'govuk-checkboxes--small',
    fieldset: {
      legend: {
        children: 'Organisation',
        isPageHeading: true,
        variant: FieldsetLegendVariant.M,
      },
    },
    items: organisationItems,
  },
};

export const Error: Story = {
  args: {
    ...nationalityStoryArgs,
    hint: {
      children:
        'If you have dual nationality, select all options that are relevant to you',
    },
    errorMessage: {
      children:
        'Select if you are British, Irish or a citizen of a different country',
    },
  },
};
