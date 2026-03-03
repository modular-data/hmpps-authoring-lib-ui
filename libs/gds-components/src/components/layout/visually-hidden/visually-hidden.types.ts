import { type ComponentProps } from 'react';

export interface VisuallyHiddenProps extends ComponentProps<'span'> {
  focusable?: boolean;
}
