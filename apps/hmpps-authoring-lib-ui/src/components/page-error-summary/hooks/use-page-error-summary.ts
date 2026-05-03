'use client';

import { useContext } from 'react';
import { PageErrorSummaryContext } from '@/components/page-error-summary/page-error-summary-provider';

export const usePageErrorSummary = () => {
  const context = useContext(PageErrorSummaryContext);

  if (!context) {
    throw new Error(
      'usePageErrorSummary must be used within a PageErrorSummaryProvider.',
    );
  }

  return context;
};
