import { type ComponentProps } from 'react';

type NativeSvgProps = ComponentProps<'svg'>;

export interface GovukLogoProps extends Omit<NativeSvgProps, 'aria-label'> {
  ariaLabelText?: string;
  rebrand?: boolean;
  useLogotype?: boolean;
  useTudorCrown?: boolean;
}
