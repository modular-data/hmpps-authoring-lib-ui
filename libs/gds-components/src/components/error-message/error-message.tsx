import { type FC } from 'react';
import classNames from 'classnames';
import { VisuallyHidden } from '../layout/visually-hidden';
import { type ErrorMessageProps } from './error-message.types';

export const ErrorMessage: FC<ErrorMessageProps> = ({
  id,
  className,
  visuallyHiddenText = 'Error',
  children,
  ...restProps
}) => {
  const combinedClassName = classNames('govuk-error-message', className);

  return (
    <p className={combinedClassName} id={id} {...restProps}>
      {visuallyHiddenText && (
        <VisuallyHidden>{visuallyHiddenText}:</VisuallyHidden>
      )}
      {children}
    </p>
  );
};
