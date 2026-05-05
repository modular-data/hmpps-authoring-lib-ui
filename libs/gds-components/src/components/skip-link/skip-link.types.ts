import { type ReactNode } from 'react';
import { type NextJsLinkProps } from '../../types/nextjs';

export interface SkipLinkProps extends Omit<NextJsLinkProps, 'href'> {
  href?: NextJsLinkProps['href'];
  children: ReactNode;
}
