import { type ComponentProps } from 'react';

export interface WarningTextProps extends ComponentProps<'div'> {
  iconFallbackText?: string;
}
