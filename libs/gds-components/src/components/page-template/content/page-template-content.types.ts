import { type ReactNode } from 'react';
import { type MainWrapperSpacing } from '../../layout/main-wrapper';

export interface GovukPageTemplateContentProps {
  main?: ReactNode;
  containerClassName?: string;
  beforeContent?: ReactNode;
  mainClassName?: string;
  mainSpacing?: MainWrapperSpacing;
  mainLang?: string;
  children?: ReactNode;
}
