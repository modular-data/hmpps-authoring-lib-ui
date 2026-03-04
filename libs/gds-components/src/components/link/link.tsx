import classNames from 'classnames';
import NextJsLink from 'next/link';
import { type LinkProps } from './link.types';

const DEFAULT_BLANK_TARGET_REL = 'noreferrer noopener';

const buildRel = (target: LinkProps['target'], rel: LinkProps['rel']) => {
  if (target !== '_blank') {
    return rel;
  }

  return rel || DEFAULT_BLANK_TARGET_REL;
};

export const Link = ({
  className,
  noVisitedState,
  noUnderline,
  isInverse,
  target,
  rel,
  ...restProps
}: LinkProps) => {
  const combinedClassName = classNames(
    'govuk-link',
    {
      'govuk-link--no-visited-state': noVisitedState,
      'govuk-link--no-underline': noUnderline,
      'govuk-link--inverse': isInverse,
    },
    className,
  );

  return (
    <NextJsLink
      className={combinedClassName}
      target={target}
      rel={buildRel(target, rel)}
      {...restProps}
    />
  );
};
