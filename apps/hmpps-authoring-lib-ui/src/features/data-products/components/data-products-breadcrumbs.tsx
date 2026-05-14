import {
  Breadcrumbs,
  type BreadcrumbsItems,
} from '@modular-data/gds-components';

interface DataProductsBreadcrumbsProps {
  items?: BreadcrumbsItems;
}

export const DataProductsBreadcrumbs = ({
  items = [],
}: DataProductsBreadcrumbsProps) => {
  const breadcrumbItems: BreadcrumbsItems = [
    { href: '/', children: 'Home' },
    {
      href: items.length > 0 ? '/data-products' : undefined,
      children: 'Data products',
    },
    ...items,
  ];

  return <Breadcrumbs items={breadcrumbItems} />;
};
