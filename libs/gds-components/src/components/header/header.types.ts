import { type ComponentProps, type ReactNode } from 'react';
import { type NextJsLinkProps } from '../../types/nextjs';

/** @deprecated GOV.UK deprecated Header navigation options in v5.9.0. Use ServiceNavigation instead. */
export interface HeaderNavigationItem extends Omit<NextJsLinkProps, 'href'> {
  href?: NextJsLinkProps['href'];
  active?: boolean;
  key?: string;
}

export interface HeaderProps extends ComponentProps<'header'> {
  containerClassName?: string;
  homepageUrl?: NextJsLinkProps['href'];
  productName?: ReactNode;
  /** @deprecated GOV.UK deprecated Header service options in v5.9.0. Use ServiceNavigation instead. */
  serviceName?: ReactNode;
  /** @deprecated GOV.UK deprecated Header service options in v5.9.0. Use ServiceNavigation instead. */
  serviceUrl?: NextJsLinkProps['href'];
  /** @deprecated GOV.UK deprecated Header navigation options in v5.9.0. Use ServiceNavigation instead. */
  navigation?: HeaderNavigationItem[];
  /** @deprecated GOV.UK deprecated Header navigation options in v5.9.0. Use ServiceNavigation instead. */
  navigationLabel?: string;
  /** @deprecated GOV.UK deprecated Header navigation options in v5.9.0. Use ServiceNavigation instead. */
  menuButtonText?: string;
  /** @deprecated GOV.UK deprecated Header navigation options in v5.9.0. Use ServiceNavigation instead. */
  menuButtonLabel?: string;
  /** @deprecated GOV.UK deprecated Header navigation options in v5.9.0. Use ServiceNavigation instead. */
  navigationClassName?: string;
  /** @deprecated Use the default Tudor crown unless matching legacy 5.14.0 output. */
  useTudorCrown?: boolean;
  rebrand?: boolean;
}
