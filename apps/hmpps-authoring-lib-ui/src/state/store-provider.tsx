'use client';

import { type ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { type AppStore, makeStore } from './make-store';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
