import { type Decorator } from '@storybook/react';
import classNames from 'classnames';
import { GridRow } from '../../../../../components/layout';

interface GridStoryDecoratorOptions {
  wrapWithRow?: boolean;
}

export const createGridStoryDecorator = ({
  wrapWithRow = false,
}: GridStoryDecoratorOptions = {}): Decorator => {
  return (Story, context) => {
    const content = <Story />;

    return (
      <div
        className={classNames(
          'grid-storybook',
          context.parameters.gridStorybookClassName,
        )}
      >
        {wrapWithRow ? <GridRow>{content}</GridRow> : content}
      </div>
    );
  };
};
