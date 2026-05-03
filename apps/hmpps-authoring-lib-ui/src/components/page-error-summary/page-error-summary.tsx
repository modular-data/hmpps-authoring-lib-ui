'use client';

import {
  ErrorSummary,
  type ErrorSummaryProps,
} from '@modular-data/gds-components';
import { usePageErrorSummary } from './hooks/use-page-error-summary';

export type PageErrorSummaryProps = Omit<
  ErrorSummaryProps,
  'title' | 'errorList'
> & {
  title?: ErrorSummaryProps['title'];
};

export const PageErrorSummary = ({
  title = 'There is a problem',
  ...restErrorSummaryProps
}: PageErrorSummaryProps) => {
  const { items } = usePageErrorSummary();

  if (items.length === 0) {
    return null;
  }

  return (
    <ErrorSummary title={title} errorList={items} {...restErrorSummaryProps} />
  );
};
