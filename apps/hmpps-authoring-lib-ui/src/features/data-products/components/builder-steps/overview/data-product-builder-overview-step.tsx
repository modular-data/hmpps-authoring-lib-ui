'use client';

import { type DataProduct } from '@/generated/core-api';
import { FormInput, FormTextarea } from '@/components/forms';
import { createDataProduct } from '@/features/data-products/actions/create-data-product';
import { saveDataProductOverview } from '@/features/data-products/actions/save-data-product-overview';
import { useDataProductBuilderStep } from '@/features/data-products/hooks/use-data-product-builder-step';
import { DATA_PRODUCT_DEFAULT_VERSION } from '@/features/data-products/constants/common';
import {
  type OverviewStepValues,
  overviewStepSchema,
} from '@/features/data-products/schemas/overview-step.schema';
import { DataProductBuilderOverviewDevHelpers } from './data-product-builder-overview-dev-helpers';

interface DataProductBuilderOverviewStepProps {
  formId: string;
  dataProduct?: DataProduct;
  onCreated?: (id: string) => void;
  onSaved: (dataProduct: DataProduct) => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
}

export const DataProductBuilderOverviewStep = ({
  formId,
  dataProduct,
  onCreated,
  onSaved,
  onSubmittingChange,
}: DataProductBuilderOverviewStepProps) => {
  const isNew = !dataProduct;

  const { metadata } = dataProduct ?? {};
  const { version } = metadata ?? {};

  const { form, formProps } = useDataProductBuilderStep<OverviewStepValues>({
    schema: overviewStepSchema,
    defaultValues: {
      ...dataProduct,
      metadata: {
        ...metadata,
        version: version ?? DATA_PRODUCT_DEFAULT_VERSION,
      },
    },
    onSubmittingChange,
    submitAction: async (values) => {
      if (isNew) {
        return createDataProduct(values);
      }

      return saveDataProductOverview(dataProduct.id, values);
    },
    onSuccess: (nextDataProduct) => {
      if (isNew) {
        onCreated?.(nextDataProduct.id);
        return;
      }

      onSaved(nextDataProduct);
    },
    genericErrorMessage: 'Unable to save right now. Please try again later.',
  });

  const { control } = form;

  return (
    <form id={formId} {...formProps}>
      <DataProductBuilderOverviewDevHelpers form={form} />

      <FormInput
        name="name"
        control={control}
        label={{ children: 'Name' }}
        hint={{ children: 'A human-readable name for this data product' }}
      />

      <FormTextarea
        name="description"
        control={control}
        label={{ children: 'Description' }}
        hint={{
          children: 'Describe the purpose and scope of this data product',
        }}
        rows={4}
      />

      <FormInput
        name="metadata.owner"
        control={control}
        label={{ children: 'Owner' }}
        hint={{
          children: 'The person responsible for this data product',
        }}
      />

      <FormInput
        name="metadata.author"
        control={control}
        label={{ children: 'Author' }}
        hint={{
          children: 'The person who created this definition',
        }}
      />

      <FormInput
        name="metadata.version"
        control={control}
        label={{ children: 'Version' }}
        hint={{
          children: `Version is automatically set to ${DATA_PRODUCT_DEFAULT_VERSION} for new data products`,
        }}
        readOnly
      />
    </form>
  );
};
