import { type FC } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { type HeaderProps } from './header.types';
import { GovukLogo } from '../govuk-logo';

// TODO: Enable GOV.UK progressive enhancement for this component once higher-priority work is complete.

export const Header: FC<HeaderProps> = ({
  className,
  containerClassName = 'govuk-width-container',
  homepageUrl = '/',
  productName,
  serviceName,
  serviceUrl,
  navigation = [],
  navigationLabel,
  navigationClassName,
  menuButtonText = 'Menu',
  menuButtonLabel,
  useTudorCrown = true,
  rebrand = false,
  ...restProps
}) => {
  const shouldRenderContent = !!(serviceName || navigation.length);

  return (
    <header
      className={classNames('govuk-header', className)}
      data-module="govuk-header"
      {...restProps}
    >
      <div
        className={classNames('govuk-header__container', containerClassName)}
      >
        <div className="govuk-header__logo">
          <Link
            className="govuk-header__link govuk-header__link--homepage"
            href={homepageUrl}
          >
            <GovukLogo
              className="govuk-header__logotype"
              ariaLabelText="GOV.UK"
              useTudorCrown={useTudorCrown}
              rebrand={rebrand}
            />
            {productName && (
              <span className="govuk-header__product-name">{productName}</span>
            )}
          </Link>
        </div>

        {shouldRenderContent && (
          <div className="govuk-header__content">
            {serviceName &&
              (serviceUrl ? (
                <Link
                  className="govuk-header__link govuk-header__service-name"
                  href={serviceUrl}
                >
                  {serviceName}
                </Link>
              ) : (
                <span className="govuk-header__service-name">
                  {serviceName}
                </span>
              ))}

            {navigation.length > 0 && (
              <nav
                className={classNames(
                  'govuk-header__navigation',
                  navigationClassName,
                )}
                aria-label={navigationLabel || menuButtonText}
              >
                <button
                  className="govuk-header__menu-button govuk-js-header-toggle"
                  type="button"
                  aria-controls="navigation"
                  aria-label={
                    menuButtonLabel && menuButtonLabel !== menuButtonText
                      ? menuButtonLabel
                      : undefined
                  }
                  hidden
                >
                  {menuButtonText}
                </button>

                <ul className="govuk-header__navigation-list" id="navigation">
                  {navigation.map((item, index) => {
                    const {
                      className: navigationItemLinkClassName,
                      key,
                      active,
                      children,
                      href,
                      ...restItemProps
                    } = item;

                    if (!children) {
                      return null;
                    }

                    let itemContent = children;

                    if (href) {
                      itemContent = (
                        <Link
                          href={href}
                          className={classNames(
                            'govuk-header__link',
                            navigationItemLinkClassName,
                          )}
                          {...restItemProps}
                        >
                          {children}
                        </Link>
                      );
                    }

                    return (
                      <li
                        key={key || `header-navigation-item-${index}`}
                        className={classNames('govuk-header__navigation-item', {
                          'govuk-header__navigation-item--active': active,
                        })}
                      >
                        {itemContent}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
