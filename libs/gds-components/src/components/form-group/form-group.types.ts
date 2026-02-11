import { type ComponentProps } from 'react';

export interface FormGroupProps extends ComponentProps<'div'> {
  withError?: boolean;
}
