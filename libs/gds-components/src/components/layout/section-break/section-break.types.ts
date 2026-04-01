import { type ComponentProps } from 'react';

export enum SectionBreakSize {
  Medium = 'm',
  Large = 'l',
  ExtraLarge = 'xl',
}

export interface SectionBreakProps extends ComponentProps<'hr'> {
  size?: SectionBreakSize;
  visible?: boolean;
}
