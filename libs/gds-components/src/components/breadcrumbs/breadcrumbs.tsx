import { type FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import {
  type BreadcrumbsItem,
  type BreadcrumbsProps,
} from './breadcrumbs.types';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  className,
  items,
  collapseOnMobile,
  labelText = 'Breadcrumb',
  'aria-label': ariaLabel,
  ...restProps
}) => {
  const renderItem = (item: BreadcrumbsItem, index: number) => {
    const itemKey = item.key ?? `breadcrumbs-item-${index}`;
    const listItemClassName = 'govuk-breadcrumbs__list-item';

    if (!item.href) {
      return (
        <li key={itemKey} className={listItemClassName} aria-current="page">
          {item.children}
        </li>
      );
    }

    const combinedLinkClassName = classNames(
      'govuk-breadcrumbs__link',
      item.className,
    );

    return (
      <li key={itemKey} className={listItemClassName}>
        <Link {...item} className={combinedLinkClassName} />
      </li>
    );
  };

  const combinedClassName = classNames(
    'govuk-breadcrumbs',
    {
      'govuk-breadcrumbs--collapse-on-mobile': collapseOnMobile,
    },
    className,
  );

  return (
    <nav
      className={combinedClassName}
      aria-label={ariaLabel ?? labelText}
      {...restProps}
    >
      <ol className="govuk-breadcrumbs__list">{items.map(renderItem)}</ol>
    </nav>
  );
};
