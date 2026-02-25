import { type ComponentProps, type Key, type ReactNode } from 'react';
import { type NextJsLinkProps } from '../../types/nextjs';

type NativeNavProps = ComponentProps<'nav'>;

type BreadcrumbsBaseItem = {
  key?: Key;
  children: ReactNode;
};

type BreadcrumbsLinkItem = BreadcrumbsBaseItem &
  Omit<NextJsLinkProps, 'children'>;

type BreadcrumbsTextItem = BreadcrumbsBaseItem & {
  href?: undefined;
};

export type BreadcrumbsItem = BreadcrumbsLinkItem | BreadcrumbsTextItem;

export type BreadcrumbsItems = BreadcrumbsItem[];

export interface BreadcrumbsProps extends Omit<NativeNavProps, 'children'> {
  items: BreadcrumbsItems;
  collapseOnMobile?: boolean;
  labelText?: string;
}
