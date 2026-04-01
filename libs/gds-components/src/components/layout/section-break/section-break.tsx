import classNames from 'classnames';
import { type SectionBreakProps } from './section-break.types';

export const SectionBreak = ({
  className,
  size,
  visible,
  ...restProps
}: SectionBreakProps) => {
  const combinedClassName = classNames(
    'govuk-section-break',
    size && `govuk-section-break--${size}`,
    visible && 'govuk-section-break--visible',
    className,
  );

  return <hr className={combinedClassName} {...restProps} />;
};
