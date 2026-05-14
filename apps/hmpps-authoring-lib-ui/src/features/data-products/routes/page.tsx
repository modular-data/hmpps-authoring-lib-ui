import { type ReactNode } from 'react';
import {
  Button,
  GovukPageTemplateContent,
  Link,
  Typography,
  TypographyVariant,
} from '@modular-data/gds-components';
import { getServices } from '@/server/services-registry';
import { DataProductsBreadcrumbs } from '@/features/data-products/components/data-products-breadcrumbs';

// TODO: Replace this temporary implementation with the actual data products page.

export const DataProductsPage = async () => {
  const { dataProductService } = getServices();

  const renderPage = (children: ReactNode) => (
    <GovukPageTemplateContent beforeContent={<DataProductsBreadcrumbs />}>
      <Typography variant={TypographyVariant.HeadingXL}>
        Data products
      </Typography>
      <Button href="/data-products/create">Create data product</Button>
      {children}
    </GovukPageTemplateContent>
  );

  try {
    const dataProducts = await dataProductService.getList();

    if (!dataProducts.length) {
      return renderPage(<Typography>No data products available.</Typography>);
    }

    return renderPage(
      <ul className="govuk-list">
        {dataProducts.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/data-products/${id}`}>{name || id}</Link>
          </li>
        ))}
      </ul>,
    );
  } catch {
    return renderPage(
      <Typography>
        Unable to load the data products page. Please try again later.
      </Typography>,
    );
  }
};
