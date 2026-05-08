import classNames from 'classnames';
import { type GovukPageTemplateRootProps } from './page-template-root.types';
import { GovukPageTemplateSupportScript } from './page-template-support-script';

// TODO MOJ-484: Align GOV.UK template head concerns with Next metadata handling.

export const GovukPageTemplateRoot = ({
  htmlLang = 'en',
  htmlClassName,
  bodyClassName,
  bodyProps,
  govukRebrand,
  cspNonce,
  children,
}: GovukPageTemplateRootProps) => {
  return (
    <html
      lang={htmlLang}
      className={classNames(
        'govuk-template',
        {
          'govuk-template--rebranded': govukRebrand,
        },
        htmlClassName,
      )}
    >
      <body
        className={classNames('govuk-template__body', bodyClassName)}
        suppressHydrationWarning={true}
        {...bodyProps}
      >
        <GovukPageTemplateSupportScript nonce={cspNonce} />
        {children}
      </body>
    </html>
  );
};
