import { type ComponentProps } from 'react';
import classNames from 'classnames';

export type ButtonGroupProps = ComponentProps<'div'>;

export const ButtonGroup = ({ className, ...restProps }: ButtonGroupProps) => (
  <div className={classNames('govuk-button-group', className)} {...restProps} />
);
