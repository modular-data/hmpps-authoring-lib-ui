import classNames from 'classnames';
import { type WidthContainerProps } from './width-container.types';

export const WidthContainer = ({
  className,
  ...restProps
}: WidthContainerProps) => {
  return (
    <div
      className={classNames('govuk-width-container', className)}
      {...restProps}
    />
  );
};
