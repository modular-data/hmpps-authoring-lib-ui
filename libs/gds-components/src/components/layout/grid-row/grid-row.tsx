import classNames from 'classnames';
import { type GridRowProps } from './grid-row.types';

export const GridRow = ({ className, ...restProps }: GridRowProps) => {
  return (
    <div className={classNames('govuk-grid-row', className)} {...restProps} />
  );
};
