import { type ComponentProps, type ReactNode } from 'react';

export interface GovukPageTemplateRootProps {
  htmlLang?: string;
  htmlClassName?: string;
  bodyClassName?: string;
  bodyProps?: Omit<ComponentProps<'body'>, 'children'>;
  govukRebrand?: boolean;
  cspNonce?: string;
  children?: ReactNode;
}
