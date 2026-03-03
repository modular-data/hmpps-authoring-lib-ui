import classNames from 'classnames';
import { type GridColumnProps } from './grid-column.types';

export const GridColumn = ({
  className,
  variant,
  desktopVariant,
  ...restProps
}: GridColumnProps) => {
  const combinedClassName = classNames(
    variant && `govuk-grid-column-${variant}`,
    desktopVariant && `govuk-grid-column-${desktopVariant}-from-desktop`,
    className,
  );

  return <div className={combinedClassName} {...restProps} />;
};
