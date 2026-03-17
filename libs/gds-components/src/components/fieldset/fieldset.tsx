import classNames from 'classnames';
import { FieldsetLegend } from './fieldset-legend';
import { type FieldsetProps } from './fieldset.types';

export const Fieldset = ({
  className,
  describedBy,
  legend,
  children,
  ...restProps
}: FieldsetProps) => {
  const combinedFieldsetClassName = classNames('govuk-fieldset', className);

  return (
    <fieldset
      className={combinedFieldsetClassName}
      aria-describedby={describedBy}
      {...restProps}
    >
      {legend && <FieldsetLegend {...legend} />}
      {children}
    </fieldset>
  );
};
