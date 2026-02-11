import { type FC } from 'react';
import classNames from 'classnames';
import { type FormGroupProps } from './form-group.types';

export const FormGroup: FC<FormGroupProps> = ({
  className,
  withError,
  ...restProps
}) => {
  const combinedClassName = classNames(
    'govuk-form-group',
    {
      'govuk-form-group--error': withError,
    },
    className,
  );

  return <div className={combinedClassName} {...restProps} />;
};
