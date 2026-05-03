'use client';

import { createContext, useMemo, useState, type ReactNode } from 'react';
import { type ErrorSummaryItems } from '@modular-data/gds-components';

export interface PageErrorSummaryContextValue {
  items: ErrorSummaryItems;
  setItems: (items: ErrorSummaryItems) => void;
}

export const PageErrorSummaryContext =
  createContext<PageErrorSummaryContextValue | null>(null);

interface PageErrorSummaryProviderProps {
  children: ReactNode;
}

export const PageErrorSummaryProvider = ({
  children,
}: PageErrorSummaryProviderProps) => {
  const [items, setItems] = useState<ErrorSummaryItems>([]);

  const value = useMemo(() => ({ items, setItems }), [items, setItems]);

  return (
    <PageErrorSummaryContext.Provider value={value}>
      {children}
    </PageErrorSummaryContext.Provider>
  );
};
