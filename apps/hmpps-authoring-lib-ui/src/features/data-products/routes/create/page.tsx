import { redirect, RedirectType } from 'next/navigation';
import {
  GovukPageTemplateContent,
  Typography,
} from '@modular-data/gds-components';
import {
  PageErrorSummary,
  PageErrorSummaryProvider,
} from '@/components/page-error-summary';
import { getServices } from '@/server/services-registry';
import { DataProductsBreadcrumbs } from '@/features/data-products/components/data-products-breadcrumbs';
import { DataProductBuilder } from '@/features/data-products/components/data-product-builder';

export const DataProductCreatePage = async () => {
  const { dataSourceService } = getServices();

  const beforeContent = (
    <DataProductsBreadcrumbs items={[{ children: 'Create' }]} />
  );

  const handleDataProductCreated = async (id: string) => {
    'use server';

    redirect(`/data-products/${id}`, RedirectType.replace);
  };

  try {
    const availableDataSources = await dataSourceService.getList();

    return (
      <GovukPageTemplateContent beforeContent={beforeContent}>
        <PageErrorSummaryProvider>
          <PageErrorSummary />
          <DataProductBuilder
            availableDataSources={availableDataSources}
            onCreated={handleDataProductCreated}
          />
        </PageErrorSummaryProvider>
      </GovukPageTemplateContent>
    );
  } catch {
    return (
      <GovukPageTemplateContent beforeContent={beforeContent}>
        <Typography>
          Unable to load the data product creation page. Please try again later.
        </Typography>
      </GovukPageTemplateContent>
    );
  }
};
