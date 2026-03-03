import classNames from 'classnames';
import { type InsetTextProps } from './inset-text.types';

export const InsetText = ({ className, ...restProps }: InsetTextProps) => {
  const combinedClassName = classNames('govuk-inset-text', className);

  return <div className={combinedClassName} {...restProps} />;
};
