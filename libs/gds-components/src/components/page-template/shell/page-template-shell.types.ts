import { type ReactNode } from 'react';

export interface GovukPageTemplateShellProps {
  bodyStart?: ReactNode;
  skipLink?: ReactNode;
  header?: ReactNode;
  serviceNavigation?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  bodyEnd?: ReactNode;
  govukRebrand?: boolean;
}
