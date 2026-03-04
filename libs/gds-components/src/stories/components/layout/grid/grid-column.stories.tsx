import { type Meta, type StoryObj } from '@storybook/react';
import {
  type GridColumn,
  type GridColumnProps,
  GridColumnVariant,
} from '../../../../components/layout';
import { createGridStoryDecorator, GridDemoColumn } from './helpers';
import './grid.stories.scss';

const description = `
Official grid examples from [GDS Layout](https://design-system.service.gov.uk/styles/layout/#using-the-grid-system).

These stories focus on single-column examples from the official GOV.UK documentation.
`.trim();

const meta = {
  title: 'Components/Layout/Grid',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  decorators: [createGridStoryDecorator({ wrapWithRow: true })],
  render: (props: GridColumnProps) => {
    return <GridDemoColumn {...props} />;
  },
} satisfies Meta<typeof GridColumn>;

export default meta;

type Story = StoryObj<typeof meta>;

const createStory = (variant: GridColumnVariant): Story => ({
  args: { variant },
});

export const FullWidth: Story = createStory(GridColumnVariant.Full);

export const OneHalf: Story = createStory(GridColumnVariant.OneHalf);

export const OneThird: Story = createStory(GridColumnVariant.OneThird);

export const TwoThirds: Story = createStory(GridColumnVariant.TwoThirds);

export const OneQuarter: Story = createStory(GridColumnVariant.OneQuarter);

export const ThreeQuarters: Story = createStory(
  GridColumnVariant.ThreeQuarters,
);
