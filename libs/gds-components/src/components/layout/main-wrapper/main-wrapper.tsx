import classNames from 'classnames';
import { type MainWrapperProps } from './main-wrapper.types';

export const MainWrapper = ({
  className,
  spacing,
  ...restProps
}: MainWrapperProps) => {
  const combinedClassName = classNames(
    'govuk-main-wrapper',
    spacing && `govuk-main-wrapper--${spacing}`,
    className,
  );

  return <main className={combinedClassName} {...restProps} />;
};
