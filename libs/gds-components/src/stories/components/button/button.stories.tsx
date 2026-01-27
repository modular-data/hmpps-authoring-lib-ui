import { type Meta, type StoryObj } from '@storybook/react';
import { Button, ButtonVariant } from '../../../components/button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

/**
 * Default button example from GDS documentation.
 */
export const Default: Story = {
  args: {
    children: 'Save and continue',
  },
};

/**
 * Start button example from GDS documentation.
 * Use for the main call to action on your service's start page.
 */
export const Start: Story = {
  args: {
    children: 'Start now',
    href: '#',
    isStartButton: true,
  },
};

/**
 * Secondary button example from GDS documentation.
 */
export const Secondary: Story = {
  args: {
    children: 'Find address',
    variant: ButtonVariant.Secondary,
  },
};

/**
 * Warning button example from GDS documentation.
 */
export const Warning: Story = {
  args: {
    children: 'Delete account',
    variant: ButtonVariant.Warning,
  },
};

/**
 * Disabled button example from GDS documentation.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled button',
    disabled: true,
  },
};

/**
 * Button group example from GDS documentation.
 * Shows primary button with a secondary link action.
 */
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

/**
 * Button group with mixed button types example from GDS documentation.
 * Shows primary and secondary buttons together.
 */
export const SecondaryCombo: Story = {
  render: () => (
    <div className="govuk-button-group">
      <Button>Save and continue</Button>
      <Button variant={ButtonVariant.Secondary}>Save as draft</Button>
    </div>
  ),
};

/**
 * Inverse button example from GDS documentation.
 * Use on dark backgrounds with the `isInverse` prop.
 */
export const Inverse: Story = {
  args: {
    children: 'Create an account',
    isInverse: true,
  },
};
