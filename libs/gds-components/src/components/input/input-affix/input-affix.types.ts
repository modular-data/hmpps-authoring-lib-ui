import { type ReactNode, type ComponentProps } from 'react';

export interface InputAffixProps extends ComponentProps<'div'> {
  type: 'prefix' | 'suffix';
  children: ReactNode;
}
