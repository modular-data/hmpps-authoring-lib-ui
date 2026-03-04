import { type NextJsLinkProps } from '../../types/nextjs';

export interface LinkProps extends NextJsLinkProps {
  noVisitedState?: boolean;
  noUnderline?: boolean;
  isInverse?: boolean;
}
