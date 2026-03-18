import { type FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { GovukLogo } from '../govuk-logo';
import { GridColumn, GridColumnVariant, WidthContainer } from '../layout';
import { Typography, TypographyVariant } from '../typography';
import { type NextJsLinkProps } from '../../types/nextjs';
import { type FooterProps } from './footer.types';

const CROWN_COPYRIGHT_URL =
  'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/';

const OPEN_GOVERNMENT_LICENCE_URL =
  'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/';

export const FooterLink = ({
  className,
  ...restLinkProps
}: NextJsLinkProps) => (
  <Link
    className={classNames('govuk-footer__link', className)}
    {...restLinkProps}
  />
);

const defaultContentLicence = (
  <>
    All content is available under the{' '}
    <FooterLink href={OPEN_GOVERNMENT_LICENCE_URL} rel="license">
      Open Government Licence v3.0
    </FooterLink>
    , except where otherwise stated
  </>
);

export const Footer: FC<FooterProps> = ({
  className,
  containerClassName,
  navigation = [],
  meta,
  contentLicence = defaultContentLicence,
  copyright = '\u00A9 Crown copyright',
  rebrand = false,
  ...restProps
}) => {
  const { items: metaItems = [] } = meta ?? {};

  return (
    <footer className={classNames('govuk-footer', className)} {...restProps}>
      <WidthContainer className={containerClassName}>
        {rebrand && (
          <GovukLogo
            className="govuk-footer__crown"
            rebrand
            useLogotype={false}
          />
        )}

        {navigation.length > 0 && (
          <>
            <div className="govuk-footer__navigation">
              {navigation.map((section, index) => {
                const {
                  key,
                  columns,
                  title,
                  width = GridColumnVariant.Full,
                  items = [],
                } = section;

                return (
                  <GridColumn
                    key={key || `footer-navigation-${index}`}
                    className="govuk-footer__section"
                    variant={width}
                  >
                    <Typography
                      className="govuk-footer__heading"
                      variant={TypographyVariant.HeadingM}
                      component="h2"
                    >
                      {title}
                    </Typography>

                    {items.length > 0 && (
                      <ul
                        className={classNames(
                          'govuk-footer__list',
                          columns && `govuk-footer__list--columns-${columns}`,
                        )}
                      >
                        {items.map((item, itemIndex) => (
                          <li
                            key={
                              item.key ||
                              `footer-navigation-item-${index}-${itemIndex}`
                            }
                            className="govuk-footer__list-item"
                          >
                            <FooterLink {...item} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </GridColumn>
                );
              })}
            </div>

            <hr className="govuk-footer__section-break" />
          </>
        )}

        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            {meta && (
              <>
                <h2 className="govuk-visually-hidden">
                  {meta.visuallyHiddenTitle || 'Support links'}
                </h2>

                {metaItems.length > 0 && (
                  <ul className="govuk-footer__inline-list">
                    {metaItems.map((item, index) => (
                      <li
                        key={item.key || `footer-meta-item-${index}`}
                        className="govuk-footer__inline-list-item"
                      >
                        <FooterLink {...item} />
                      </li>
                    ))}
                  </ul>
                )}

                {meta.children && (
                  <div className="govuk-footer__meta-custom">
                    {meta.children}
                  </div>
                )}
              </>
            )}

            {contentLicence && (
              <>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="govuk-footer__licence-logo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 483.2 195.7"
                  height="17"
                  width="41"
                >
                  <path
                    fill="currentColor"
                    d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
                  />
                </svg>
                <span className="govuk-footer__licence-description">
                  {contentLicence}
                </span>
              </>
            )}
          </div>

          <div className="govuk-footer__meta-item">
            <FooterLink
              className="govuk-footer__copyright-logo"
              href={CROWN_COPYRIGHT_URL}
            >
              {copyright}
            </FooterLink>
          </div>
        </div>
      </WidthContainer>
    </footer>
  );
};
