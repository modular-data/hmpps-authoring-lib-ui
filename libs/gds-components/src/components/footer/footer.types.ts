import { type ComponentProps, type ReactNode } from 'react';
import { type NextJsLinkProps } from '../../types/nextjs';
import { type GridColumnVariant } from '../layout/grid-column';

type NativeFooterProps = ComponentProps<'footer'>;

export interface FooterLinkItem extends NextJsLinkProps {
  key?: string;
  children: ReactNode;
  href: NextJsLinkProps['href'];
}

export type FooterLinkItems = FooterLinkItem[];

export interface FooterNavigationSection {
  key?: string;
  title: ReactNode;
  columns?: number;
  width?: GridColumnVariant;
  items?: FooterLinkItems;
}

export type FooterNavigationSections = FooterNavigationSection[];

export interface FooterMeta {
  visuallyHiddenTitle?: string;
  items?: FooterLinkItems;
  children?: ReactNode;
}

export interface FooterProps extends Omit<NativeFooterProps, 'children'> {
  containerClassName?: string;
  navigation?: FooterNavigationSections;
  meta?: FooterMeta;
  contentLicence?: ReactNode;
  copyright?: ReactNode;
  rebrand?: boolean;
}
