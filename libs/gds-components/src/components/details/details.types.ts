import { type ComponentProps, type ReactNode } from 'react';

type NativeDetailsProps = ComponentProps<'details'>;

export interface DetailsProps extends NativeDetailsProps {
  summary: ReactNode;
}
