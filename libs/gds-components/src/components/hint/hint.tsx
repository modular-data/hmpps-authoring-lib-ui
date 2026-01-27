import { type FC } from 'react';
import classNames from 'classnames';
import { type HintProps } from './hint.types';

export const Hint: FC<HintProps> = ({ className, ...restProps }) => {
  const combinedClassName = classNames('govuk-hint', className);

  return <div className={combinedClassName} {...restProps} />;
};
