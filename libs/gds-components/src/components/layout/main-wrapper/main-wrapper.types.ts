import { type ComponentProps } from 'react';

export enum MainWrapperSpacing {
  AutoSpacing = 'auto-spacing',
  Large = 'l',
}

export interface MainWrapperProps extends ComponentProps<'main'> {
  spacing?: MainWrapperSpacing;
}
