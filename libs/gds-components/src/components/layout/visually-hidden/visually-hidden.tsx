import classNames from 'classnames';
import { type VisuallyHiddenProps } from './visually-hidden.types';

export const VisuallyHidden = ({
  className,
  focusable,
  ...restProps
}: VisuallyHiddenProps) => {
  const combinedClassName = classNames(
    'govuk-visually-hidden',
    {
      'govuk-visually-hidden-focusable': focusable,
    },
    className,
  );

  return <span className={combinedClassName} {...restProps} />;
};
