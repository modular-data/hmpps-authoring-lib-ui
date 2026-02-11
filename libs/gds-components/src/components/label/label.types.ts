import { type DetailedHTMLProps, type LabelHTMLAttributes } from 'react';

type NativeLabelProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export enum LabelVariant {
  XL = 'xl',
  L = 'l',
  M = 'm',
  S = 's',
}

export interface LabelProps extends NativeLabelProps {
  variant?: LabelVariant;
  isPageHeading?: boolean;
}
