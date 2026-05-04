'use client';

import { Typography, TypographyVariant } from '@modular-data/gds-components';
import { type DataProduct, type DataSource } from '@/generated/core-api';
import { assertNever } from '@/types/utils/assert-never';
import { DataProductBuilderStep } from '@/features/data-products/types/steps';
import { DATA_PRODUCT_BUILDER_STEP_DEFINITIONS_MAP } from '@/features/data-products/constants/steps';
import { DataProductBuilderOverviewStep } from '@/features/data-products/components/builder-steps/overview/data-product-builder-overview-step';
import { DataProductBuilderDataSourcesStep } from '@/features/data-products/components/builder-steps/data-sources/data-product-builder-data-sources-step';
import './data-product-builder-step-content.scss';

interface DataProductBuilderStepContentProps {
  formId: string;
  currentStep: DataProductBuilderStep;
  dataProduct?: DataProduct;
  availableDataSources: DataSource[];
  onCreated?: (id: string) => void;
  onStepSaveSuccess: (dataProduct: DataProduct) => void;
  onStepSubmittingChange: (isSubmitting: boolean) => void;
}

export const DataProductBuilderStepContent = ({
  formId,
  currentStep,
  dataProduct,
  availableDataSources,
  onCreated,
  onStepSaveSuccess,
  onStepSubmittingChange,
}: DataProductBuilderStepContentProps) => {
  const stepDefinition = DATA_PRODUCT_BUILDER_STEP_DEFINITIONS_MAP[currentStep];

  const commonStepProps = {
    formId,
    dataProduct,
    onSaved: onStepSaveSuccess,
    onSubmittingChange: onStepSubmittingChange,
  };

  const renderStep = (step: DataProductBuilderStep) => {
    switch (step) {
      case DataProductBuilderStep.Overview:
        return (
          <DataProductBuilderOverviewStep
            {...commonStepProps}
            onCreated={onCreated}
          />
        );

      case DataProductBuilderStep.DataSources:
        return (
          <DataProductBuilderDataSourcesStep
            {...commonStepProps}
            availableDataSources={availableDataSources}
          />
        );

      case DataProductBuilderStep.Datasets:
        return <Typography>Coming soon...</Typography>;

      case DataProductBuilderStep.Policies:
        return <Typography>Coming soon...</Typography>;

      case DataProductBuilderStep.Reports:
        return <Typography>Coming soon...</Typography>;
    }

    return assertNever(step);
  };

  return (
    <div className="data-product-builder-step-content">
      <Typography
        className="data-product-builder-step-content__title"
        variant={TypographyVariant.HeadingL}
      >
        {stepDefinition.title}
      </Typography>
      <Typography className="data-product-builder-step-content__description">
        {stepDefinition.description}
      </Typography>
      {renderStep(currentStep)}
    </div>
  );
};
