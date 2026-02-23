import classNames from 'classnames';
import { type DetailsProps } from './details.types';

export const Details = ({
  className,
  summary,
  children,
  ...restProps
}: DetailsProps) => {
  const combinedClassName = classNames('govuk-details', className);

  return (
    <details className={combinedClassName} {...restProps}>
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summary}</span>
      </summary>
      <div className="govuk-details__text">{children}</div>
    </details>
  );
};
