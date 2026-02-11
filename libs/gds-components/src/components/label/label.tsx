import { type FC } from 'react';
import classNames from 'classnames';
import { type LabelProps } from './label.types';

export const Label: FC<LabelProps> = ({
  className,
  variant,
  isPageHeading = false,
  ...restProps
}) => {
  const combinedClassName = classNames(
    'govuk-label',
    variant && `govuk-label--${variant}`,
    className,
  );

  const labelElement = <label className={combinedClassName} {...restProps} />;

  if (isPageHeading) {
    return <h1 className="govuk-label-wrapper">{labelElement}</h1>;
  }

  return labelElement;
};
