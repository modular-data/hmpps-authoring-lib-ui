import { type Meta, type StoryObj } from '@storybook/react';
import { BackLink } from '../../../components/back-link';
import {
  GridColumn,
  GridColumnVariant,
  GridRow,
  MainWrapper,
  MainWrapperSpacing,
  type MainWrapperProps,
  WidthContainer,
} from '../../../components/layout';
import { Typography, TypographyVariant } from '../../../components/typography';

const description = `
Official examples for main wrapper usage from [GDS Layout](https://design-system.service.gov.uk/styles/layout/#add-vertical-space).

Includes the default wrapper and the larger spacing wrapper used when there is no back link, breadcrumbs or phase banner.
`.trim();

const meta = {
  title: 'Components/Layout/MainWrapper',
  component: MainWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta<typeof MainWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderMainWrapperExample = (
  args: MainWrapperProps,
  withBackLink: boolean,
) => (
  <WidthContainer>
    {withBackLink && <BackLink href="#">Back</BackLink>}
    <MainWrapper {...args}>
      <GridRow>
        <GridColumn variant={GridColumnVariant.TwoThirds}>
          <Typography variant={TypographyVariant.HeadingXL}>
            Page title
          </Typography>
        </GridColumn>
      </GridRow>
    </MainWrapper>
  </WidthContainer>
);

export const Default: Story = {
  render: (args) => renderMainWrapperExample(args, true),
};

export const LargeSpacingWithoutContentAfterHeader: Story = {
  args: {
    spacing: MainWrapperSpacing.Large,
  },
  render: (args) => renderMainWrapperExample(args, false),
};
