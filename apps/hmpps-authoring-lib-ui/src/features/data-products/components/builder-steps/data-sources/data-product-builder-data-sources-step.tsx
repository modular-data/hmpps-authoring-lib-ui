'use client';

import { FieldsetLegendVariant } from '@modular-data/gds-components';
import { type DataProduct, type DataSource } from '@/generated/core-api';
import { FormCheckboxes } from '@/components/forms';
import { saveDataProductDataSources } from '@/features/data-products/actions/save-data-product-data-sources';
import { useDataProductBuilderStep } from '@/features/data-products/hooks/use-data-product-builder-step';
import {
  dataSourcesStepSchema,
  type DataSourcesStepValues,
} from '@/features/data-products/schemas/data-sources-step.schema';

interface DataProductBuilderDataSourcesStepProps {
  formId: string;
  dataProduct?: DataProduct;
  availableDataSources: DataSource[];
  onSaved: (dataProduct: DataProduct) => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
}

export const DataProductBuilderDataSourcesStep = ({
  formId,
  dataProduct,
  availableDataSources,
  onSaved,
  onSubmittingChange,
}: DataProductBuilderDataSourcesStepProps) => {
  const { form, formProps } = useDataProductBuilderStep<DataSourcesStepValues>({
    schema: dataSourcesStepSchema,
    defaultValues: {
      dataSourceIds: (dataProduct?.dataSources || []).map(
        (source) => source.id,
      ),
    },
    onSubmittingChange,
    submitAction: async (values) => {
      if (!dataProduct?.id) {
        throw new Error('Data product ID is required to save data sources.');
      }

      return saveDataProductDataSources(dataProduct.id, values);
    },
    onSuccess: onSaved,
    genericErrorMessage:
      'Unable to save data sources right now. Please try again later.',
  });

  const { control } = form;

  const checkboxItems = availableDataSources.map(
    ({ id, name, connection, dialect }) => {
      const hintText = [connection, dialect].filter(Boolean).join(' · ');

      return {
        value: id,
        children: name ?? id,
        hint: hintText ? { children: hintText } : undefined,
      };
    },
  );

  return (
    <form id={formId} {...formProps}>
      <FormCheckboxes
        name="dataSourceIds"
        control={control}
        fieldset={{
          legend: {
            children: 'Select data sources',
            variant: FieldsetLegendVariant.M,
          },
        }}
        hint={{
          children:
            'Select one or more data sources that will power this data product.',
        }}
        items={checkboxItems}
      />
    </form>
  );
};
