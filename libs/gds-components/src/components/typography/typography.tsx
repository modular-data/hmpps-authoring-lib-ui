import type { FC, ReactNode } from 'react';
import classNames from 'classnames';

export enum TypographyVariant {
  HeadingXL = 'heading-xl',
  HeadingL = 'heading-l',
  HeadingM = 'heading-m',
  HeadingS = 'heading-s',
  CaptionXL = 'caption-xl',
  CaptionL = 'caption-l',
  CaptionM = 'caption-m',
  BodyL = 'body-l',
  Body = 'body',
  BodyS = 'body-s',
}

type AllowedTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

const defaultComponentByVariant: Record<TypographyVariant, AllowedTag> = {
  [TypographyVariant.HeadingXL]: 'h1',
  [TypographyVariant.HeadingL]: 'h2',
  [TypographyVariant.HeadingM]: 'h3',
  [TypographyVariant.HeadingS]: 'h4',
  [TypographyVariant.CaptionXL]: 'span',
  [TypographyVariant.CaptionL]: 'span',
  [TypographyVariant.CaptionM]: 'span',
  [TypographyVariant.BodyL]: 'p',
  [TypographyVariant.Body]: 'p',
  [TypographyVariant.BodyS]: 'p',
};

type TypographyProps = {
  className?: string;
  variant?: TypographyVariant;
  component?: AllowedTag;
  children: ReactNode;
};

export const Typography: FC<TypographyProps> = ({
  className,
  variant = TypographyVariant.Body,
  children,
  component,
}) => {
  const Component = component || defaultComponentByVariant[variant];

  return (
    <Component className={classNames(`govuk-${variant}`, className)}>
      {children}
    </Component>
  );
};
