import { type ReactNode } from 'react';
import {
  GovukPageTemplateContent,
  Typography,
} from '@modular-data/gds-components';
import {
  PageErrorSummary,
  PageErrorSummaryProvider,
} from '@/components/page-error-summary';
import { getServices } from '@/server/services-registry';
import { DataProductBuilder } from '@/features/data-products/components/data-product-builder';
import { DataProductsBreadcrumbs } from '@/features/data-products/components/data-products-breadcrumbs';

interface DataProductDetailsPageParams {
  id: string;
}

interface DataProductDetailsPageProps {
  params: Promise<DataProductDetailsPageParams>;
}

export const DataProductDetailsPage = async ({
  params,
}: DataProductDetailsPageProps) => {
  const { id } = await params;

  const { dataProductService, dataSourceService } = getServices();

  const renderPage = (breadcrumbLabel: string, children: ReactNode) => (
    <GovukPageTemplateContent
      beforeContent={
        <DataProductsBreadcrumbs items={[{ children: breadcrumbLabel }]} />
      }
    >
      {children}
    </GovukPageTemplateContent>
  );

  try {
    const [dataProduct, dataProductDefinition, dataSources] = await Promise.all(
      [
        dataProductService.getById(id),
        dataProductService.getDefinitionById(id),
        dataSourceService.getList(),
      ],
    );

    return renderPage(
      dataProduct.name,
      <PageErrorSummaryProvider>
        <PageErrorSummary />
        <DataProductBuilder
          initialDataProduct={dataProduct}
          dataProductDefinition={dataProductDefinition}
          availableDataSources={dataSources}
        />
      </PageErrorSummaryProvider>,
    );
  } catch {
    return renderPage(
      id,
      <Typography>
        Unable to load the data product with ID {id}. Please try again later.
      </Typography>,
    );
  }
};
