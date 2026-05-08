import { Header } from '../../header';
import { SkipLink } from '../../skip-link';
import { Footer } from '../../footer';
import { type GovukPageTemplateShellProps } from './page-template-shell.types';

export const GovukPageTemplateShell = ({
  bodyStart,
  skipLink,
  header,
  serviceNavigation,
  children,
  footer,
  bodyEnd,
  govukRebrand = false,
}: GovukPageTemplateShellProps) => {
  const resolvedSkipLink =
    skipLink === undefined ? (
      <SkipLink href="#main-content">Skip to main content</SkipLink>
    ) : (
      skipLink
    );

  const resolvedHeader =
    header === undefined ? <Header rebrand={govukRebrand} /> : header;

  const resolvedFooter =
    footer === undefined ? <Footer rebrand={govukRebrand} /> : footer;

  return (
    <>
      {bodyStart}

      {resolvedSkipLink}

      {resolvedHeader}

      {serviceNavigation}

      {children}

      {resolvedFooter}

      {bodyEnd}
    </>
  );
};
