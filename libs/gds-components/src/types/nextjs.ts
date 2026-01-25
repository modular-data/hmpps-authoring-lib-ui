import { type AnchorHTMLAttributes } from 'react';
import { type LinkProps as InternalNextJsLinkProps } from 'next/link';

export type NextJsLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof InternalNextJsLinkProps
> &
  InternalNextJsLinkProps;
