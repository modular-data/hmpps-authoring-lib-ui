import { type Meta, type StoryObj } from '@storybook/react';
import { WidthContainer } from '../../../components/layout';
import { Typography, TypographyVariant } from '../../../components/typography';

const description = `
Official examples for width container usage from [GDS Layout](https://design-system.service.gov.uk/styles/layout/#setting-up-page-wrappers).

This story focuses on width constraint only.
Use \`MainWrapper\` stories for full page-wrapper composition examples.
`.trim();

const meta = {
  title: 'Components/Layout/WidthContainer',
  component: WidthContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta<typeof WidthContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <WidthContainer {...args}>
      <Typography variant={TypographyVariant.HeadingL}>
        Width container
      </Typography>
      <Typography variant={TypographyVariant.Body}>
        The width container limits content width and applies responsive
        horizontal gutters.
      </Typography>
      <Typography variant={TypographyVariant.Body}>
        Use this wrapper around page content regions that should align to the
        GOV.UK content width.
      </Typography>
    </WidthContainer>
  ),
};
