import { type Meta, type StoryObj } from '@storybook/react';
import { ErrorSummary } from '../../../components/error-summary';
import { Input } from '../../../components/input';
import { Checkboxes } from '../../../components/checkboxes';
import { Typography } from '../../../components/typography';
import { FieldsetLegendVariant } from '../../../components/fieldset';

const description = `
React implementation of the [GDS Error summary component](https://design-system.service.gov.uk/components/error-summary/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/error-summary)

## Key Differences from GDS Nunjucks macro

- **Content API**: this component does not split text vs HTML params; use ReactNode content (\`title\`, \`description\`, and \`errorList[].children\`)
- **Classes**: GDS uses \`classes\`, React uses \`className\`
- **Attributes**: GDS uses \`attributes\`, React uses native props spreading
`.trim();

const meta = {
  title: 'Components/ErrorSummary',
  component: ErrorSummary,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  args: {
    title: 'There is a problem',
  },
} satisfies Meta<typeof ErrorSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errorList: [
      {
        children: 'Enter your full name',
        href: '#',
      },
      {
        children: 'The date your passport was issued must be in the past',
        href: '#',
      },
    ],
  },
};

export const LinkingSingleField: Story = {
  args: {
    errorList: [
      {
        children: 'Enter your full name',
        href: '#full-name-input',
      },
    ],
  },
  render: (args) => (
    <>
      <ErrorSummary {...args} />

      <h1 className="govuk-heading-l">Your details</h1>

      <Input
        id="full-name-input"
        name="name"
        autoComplete="name"
        label={{ children: 'Full name' }}
        errorMessage={{ children: 'Enter your full name' }}
      />
    </>
  ),
};

export const LinkingMultipleFields: Story = {
  args: {
    errorList: [
      {
        children: 'Passport issue date must include a year',
        href: '#passport-issued-year',
      },
    ],
  },
  render: (args) => (
    <>
      <ErrorSummary {...args} />

      <Typography>
        TODO: DateInput example is deferred until the DateInput component is
        merged. This placeholder keeps the error summary link testable.
      </Typography>
    </>
  ),
};

export const LinkingCheckboxes: Story = {
  args: {
    errorList: [
      {
        children:
          'Select if you are British, Irish or a citizen of a different country',
        href: '#nationality',
      },
    ],
  },
  render: (args) => (
    <>
      <ErrorSummary {...args} />

      <Checkboxes
        name="nationality"
        idPrefix="nationality"
        fieldset={{
          legend: {
            children: 'What is your nationality?',
            isPageHeading: true,
            variant: FieldsetLegendVariant.L,
          },
        }}
        hint={{
          children:
            'If you have dual nationality, select all options that are relevant to you',
        }}
        errorMessage={{
          children:
            'Select if you are British, Irish or a citizen of a different country',
        }}
        items={[
          {
            value: 'british',
            children: 'British',
            hint: {
              children: 'including English, Scottish, Welsh and Northern Irish',
            },
          },
          {
            value: 'irish',
            children: 'Irish',
          },
          {
            value: 'other',
            children: 'Citizen of another country',
          },
        ]}
      />
    </>
  ),
};
