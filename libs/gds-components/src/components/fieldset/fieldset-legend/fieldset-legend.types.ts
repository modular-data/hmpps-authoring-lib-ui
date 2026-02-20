import { type ComponentProps } from 'react';

export enum FieldsetLegendVariant {
  XL = 'xl',
  L = 'l',
  M = 'm',
  S = 's',
}

export interface FieldsetLegendProps extends ComponentProps<'legend'> {
  variant?: FieldsetLegendVariant;
  isPageHeading?: boolean;
}
