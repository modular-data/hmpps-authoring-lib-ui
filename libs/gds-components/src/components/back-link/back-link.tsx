import classNames from 'classnames';
import Link from 'next/link';
import { type BackLinkProps } from './back-link.types';

export const BackLink = ({
  className,
  children = 'Back',
  isInverse,
  ...restProps
}: BackLinkProps) => {
  const combinedClassName = classNames(
    'govuk-back-link',
    {
      'govuk-back-link--inverse': isInverse,
    },
    className,
  );

  return (
    <Link className={combinedClassName} {...restProps}>
      {children}
    </Link>
  );
};
