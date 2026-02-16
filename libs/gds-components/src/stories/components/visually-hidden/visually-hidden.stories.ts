import { type Meta, type StoryObj } from '@storybook/react';
import { VisuallyHidden } from '../../../components/visually-hidden';

const description = `
React implementation of the [GDS Visually Hidden utility](https://design-system.service.gov.uk/styles/layout/#hide-elements-and-keep-them-accessible-to-screen-readers).

## Key Differences from GDS utility class usage

- **Component form**: GDS applies a CSS class directly, React provides a \`VisuallyHidden\` wrapper component
- **Content**: React accepts hidden content through \`children\`
`.trim();

const meta = {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  args: {
    children: 'Some screen reader hint',
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
