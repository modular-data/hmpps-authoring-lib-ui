import classNames from 'classnames';
import { VisuallyHidden } from '../layout/visually-hidden';
import { type WarningTextProps } from './warning-text.types';

export const WarningText = ({
  className,
  children,
  iconFallbackText = 'Warning',
  ...restProps
}: WarningTextProps) => {
  const combinedClassName = classNames('govuk-warning-text', className);

  return (
    <div className={combinedClassName} {...restProps}>
      <span className="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>
      <strong className="govuk-warning-text__text">
        <VisuallyHidden>{iconFallbackText}</VisuallyHidden>
        {children}
      </strong>
    </div>
  );
};
