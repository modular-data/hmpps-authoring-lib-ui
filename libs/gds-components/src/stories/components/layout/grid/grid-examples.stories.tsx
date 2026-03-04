import { type Meta, type StoryObj } from '@storybook/react';
import { GridRow, GridColumnVariant } from '../../../../components/layout';
import {
  createGridStoryDecorator,
  GridDemoColumn,
  renderGridDemoRow,
} from './helpers';
import './grid.stories.scss';

const description = `
Official grid examples from [GDS Layout](https://design-system.service.gov.uk/styles/layout/#using-the-grid-system).

These stories focus on combinations, desktop variants and nested grid examples from the official GOV.UK documentation.
`.trim();

const meta = {
  title: 'Components/Layout/Grid/Examples',
  component: GridRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: description,
      },
    },
  },
  decorators: [createGridStoryDecorator()],
} satisfies Meta<typeof GridRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Combinations: Story = {
  parameters: {
    gridStorybookClassName: 'grid-storybook--combinations',
  },
  render: () => (
    <>
      {renderGridDemoRow([{ variant: GridColumnVariant.Full }])}
      {renderGridDemoRow([
        { variant: GridColumnVariant.OneHalf },
        { variant: GridColumnVariant.OneHalf },
      ])}
      {renderGridDemoRow([
        { variant: GridColumnVariant.TwoThirds },
        { variant: GridColumnVariant.OneThird },
      ])}
      {renderGridDemoRow([
        { variant: GridColumnVariant.OneThird },
        { variant: GridColumnVariant.TwoThirds },
      ])}
      {renderGridDemoRow([
        { variant: GridColumnVariant.ThreeQuarters },
        { variant: GridColumnVariant.OneQuarter },
      ])}
      {renderGridDemoRow([
        { variant: GridColumnVariant.OneQuarter },
        { variant: GridColumnVariant.ThreeQuarters },
      ])}
    </>
  ),
};

export const DesktopGridClasses: Story = {
  parameters: {
    gridStorybookClassName: 'grid-storybook--combinations',
  },
  render: () => {
    return renderGridDemoRow([
      { desktopVariant: GridColumnVariant.TwoThirds },
      { desktopVariant: GridColumnVariant.OneThird },
    ]);
  },
};

export const DesktopAndTabletGridClasses: Story = {
  render: () => {
    return renderGridDemoRow([
      {
        variant: GridColumnVariant.OneHalf,
        desktopVariant: GridColumnVariant.TwoThirds,
      },
      {
        variant: GridColumnVariant.OneHalf,
        desktopVariant: GridColumnVariant.OneThird,
      },
    ]);
  },
};

export const Nested: Story = {
  parameters: {
    gridStorybookClassName: 'grid-storybook--nested',
  },
  render: () => (
    <GridRow>
      <GridDemoColumn variant={GridColumnVariant.TwoThirds}>
        {renderGridDemoRow([
          { variant: GridColumnVariant.OneHalf },
          { variant: GridColumnVariant.OneHalf },
        ])}
      </GridDemoColumn>
    </GridRow>
  ),
};
