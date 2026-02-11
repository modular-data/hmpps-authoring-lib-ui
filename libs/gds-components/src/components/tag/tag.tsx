import { type FC } from 'react';
import classNames from 'classnames';
import { type TagProps } from './tag.types';

export const Tag: FC<TagProps> = ({ className, colour, children }) => {
  const combinedClassName = classNames(
    'govuk-tag',
    {
      [`govuk-tag--${colour}`]: colour,
    },
    className,
  );

  return <strong className={combinedClassName}>{children}</strong>;
};
