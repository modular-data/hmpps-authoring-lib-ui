import { type Meta, type StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { Select, type SelectProps } from '../../../components/select';
import { locationItems, sortItems } from './select.story-data';

const description = `
React implementation of the [GDS Select component](https://design-system.service.gov.uk/components/select/).

**GDS Source**: [govuk-frontend template](https://github.com/alphagov/govuk-frontend/tree/main/packages/govuk-frontend/src/govuk/components/select)

## Key Differences from GDS Nunjucks macro

- **Field content**: GDS uses \`text\` or \`html\`, React uses \`children\`
- **Classes**: GDS uses \`classes\`, React uses \`className\`
- **Attributes**: GDS uses \`attributes\`, React uses native props spreading
- **Items**: GDS uses \`item.text\`, React uses \`item.children\`
- **GDS docs mismatch**: docs options imply \`label.for\`, \`hint.id\`, and \`errorMessage.id\` are overridable, but the original templates derive them from field \`id\`/\`name\` and ignore overrides. This implementation follows template behavior exactly.
`.trim();

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const locationStoryArgs: Story['args'] = {
  id: 'location',
  name: 'location',
  label: {
    children: 'Choose location',
  },
  hint: {
    children: 'This can be different to where you went before',
  },
  value: locationItems[0].value,
  items: locationItems,
};

const RenderInteractiveSelect: Story['render'] = (args) => {
  const [, updateArgs] = useArgs<SelectProps>();

  const handleChange: SelectProps['onChange'] = (event) => {
    args.onChange?.(event);
    updateArgs({ value: event.currentTarget.value });
  };

  return <Select {...args} onChange={handleChange} />;
};

export const Default: Story = {
  args: {
    id: 'sort',
    name: 'sort',
    label: {
      children: 'Sort by',
    },
    value: sortItems[1].value,
    items: sortItems,
  },
  render: RenderInteractiveSelect,
};

export const WithHint: Story = {
  args: locationStoryArgs,
  render: RenderInteractiveSelect,
};

export const Error: Story = {
  args: {
    ...locationStoryArgs,
    errorMessage: { children: 'Select a location' },
  },
  render: RenderInteractiveSelect,
};
