import { type ReactNode } from 'react';
import { StoreProvider } from '@/state';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <StoreProvider>{children}</StoreProvider>;
};
