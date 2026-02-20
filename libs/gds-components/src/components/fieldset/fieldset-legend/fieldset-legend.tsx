import classNames from 'classnames';
import { type FieldsetLegendProps } from './fieldset-legend.types';

export const FieldsetLegend = ({
  className,
  variant,
  isPageHeading,
  children,
  ...restLegendProps
}: FieldsetLegendProps) => {
  const combinedLegendClassName = classNames(
    'govuk-fieldset__legend',
    variant && `govuk-fieldset__legend--${variant}`,
    className,
  );

  return (
    <legend className={combinedLegendClassName} {...restLegendProps}>
      {isPageHeading ? (
        <h1 className="govuk-fieldset__heading">{children}</h1>
      ) : (
        children
      )}
    </legend>
  );
};
