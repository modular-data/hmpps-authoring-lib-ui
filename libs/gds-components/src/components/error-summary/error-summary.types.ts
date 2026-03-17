import { type ComponentProps, type ReactNode } from 'react';

export interface ErrorSummaryItem extends ComponentProps<'a'> {
  key?: string;
  href?: string;
  children: ReactNode;
}

export type ErrorSummaryItems = ErrorSummaryItem[];

export interface ErrorSummaryProps
  extends Omit<ComponentProps<'div'>, 'children' | 'title'> {
  title: ReactNode;
  description?: ReactNode;
  errorList?: ErrorSummaryItems;
  disableAutoFocus?: boolean;
}
