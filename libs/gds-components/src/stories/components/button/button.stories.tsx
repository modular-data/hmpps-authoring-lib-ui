import { type Meta, type StoryObj } from '@storybook/react';
import { Button, ButtonVariant } from '../../../components/button';

const description = `
React implementation of the [GDS Button component](https://design-system.service.gov.uk/components/button/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/button)

## Key Differences from GDS Nunjucks macro

- **Content**: GDS uses \`text\` or \`html\` params, React uses \`children\` prop
- **Variants**: Primary is default when \`variant\` is unset; React exposes explicit \`Secondary\` and \`Warning\` variants
- **Navigation**: GDS uses plain \`<a>\` tag, React uses Next.js \`Link\` component
- **preventDoubleClick**: GDS exposes \`preventDoubleClick\` to guard form submits in non-React templates; this React component intentionally omits it
- **Props**: GDS uses explicit \`attributes\` params, React uses native React HTML attributes with props spreading
`.trim();

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  args: {
    children: 'Save and continue',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Start: Story = {
  args: {
    children: 'Start now',
    href: '#',
    isStartButton: true,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Find address',
    variant: ButtonVariant.Secondary,
  },
};

export const Warning: Story = {
  args: {
    children: 'Delete account',
    variant: ButtonVariant.Warning,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled button',
    disabled: true,
  },
};

export const ButtonGroup: Story = {
  render: () => (
    <div className="govuk-button-group">
      <Button>Continue</Button>
      <a className="govuk-link" href="/cancel">
        Cancel
      </a>
    </div>
  ),
};

export const SecondaryCombo: Story = {
  render: () => (
    <div className="govuk-button-group">
      <Button>Save and continue</Button>
      <Button variant={ButtonVariant.Secondary}>Save as draft</Button>
    </div>
  ),
};

export const Inverse: Story = {
  args: {
    children: 'Create an account',
    isInverse: true,
  },
};
