import classNames from 'classnames';
import Link from 'next/link';
import { type SkipLinkProps } from './skip-link.types';

// TODO: Add GOV.UK Frontend SkipLink progressive enhancement to move focus to the target element.

export const SkipLink = ({
  className,
  href = '#content',
  children,
  ...restProps
}: SkipLinkProps) => {
  return (
    <Link
      className={classNames('govuk-skip-link', className)}
      href={href}
      data-module="govuk-skip-link"
      {...restProps}
    >
      {children}
    </Link>
  );
};
