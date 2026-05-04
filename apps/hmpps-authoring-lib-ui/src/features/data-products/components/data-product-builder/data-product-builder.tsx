'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  GridColumn,
  GridColumnVariant,
  GridRow,
  SectionBreak,
  SectionBreakSize,
  Typography,
  TypographyVariant,
} from '@modular-data/gds-components';
import {
  DataProductStateType,
  type DataProduct,
  type DataProductDefinition,
  type DataSource,
} from '@/generated/core-api';
import {
  deriveDefaultStep,
  deriveStepMetaByStep,
  getNextAvailableStep,
  getPreviousAvailableStep,
} from '@/features/data-products/utils/steps';
import { DataProductStateTag } from '@/features/data-products/components/data-product-state-tag';
import { DataProductBuilderStepper } from '@/features/data-products/components/data-product-builder-stepper';
import { DataProductDefinitionViewer } from '@/features/data-products/components/data-product-definition-viewer';
import { DataProductBuilderStepContent } from '@/features/data-products/components/data-product-builder-step-content';
import { DataProductBuilderFooter } from '@/features/data-products/components/data-product-builder-footer';
import './data-product-builder.scss';

const ACTIVE_STEP_FORM_ID = 'data-product-builder-active-step-form';

interface DataProductBuilderProps {
  initialDataProduct?: DataProduct;
  dataProductDefinition?: DataProductDefinition;
  availableDataSources?: DataSource[];
  onCreated?: (id: string) => void;
}

export const DataProductBuilder = ({
  initialDataProduct,
  dataProductDefinition,
  availableDataSources = [],
  onCreated,
}: DataProductBuilderProps) => {
  const [dataProduct, setDataProduct] = useState<DataProduct | undefined>(
    initialDataProduct,
  );

  const stepMetaByStep = useMemo(
    () => deriveStepMetaByStep(dataProduct),
    [dataProduct],
  );

  const [currentStep, setCurrentStep] = useState(() => {
    return deriveDefaultStep(stepMetaByStep);
  });

  const [isStepSubmitting, setIsStepSubmitting] = useState(false);

  useEffect(() => {
    setIsStepSubmitting(false);
  }, [currentStep]);

  const { id, state = DataProductStateType.DRAFT } = dataProduct ?? {};
  const canEditDataProduct = !id || state === DataProductStateType.DRAFT;

  const previousStep = getPreviousAvailableStep(currentStep, stepMetaByStep);

  const handleStepSaveSuccess = (nextDataProduct: DataProduct) => {
    const nextStepMetaByStep = deriveStepMetaByStep(nextDataProduct);
    const nextStep = getNextAvailableStep(currentStep, nextStepMetaByStep);

    setDataProduct(nextDataProduct);

    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  return (
    <>
      <Typography variant={TypographyVariant.CaptionXL}>
        Create and configure data product definitions. Complete each step to
        build a valid definition.
      </Typography>
      <Typography variant={TypographyVariant.HeadingXL}>
        Data Product Builder
      </Typography>

      <GridRow>
        <GridColumn variant={GridColumnVariant.OneThird}>
          <DataProductStateTag state={state} />

          <DataProductBuilderStepper
            className="data-product-builder__stepper"
            currentStep={currentStep}
            stepMetaByStep={stepMetaByStep}
            onStepChange={setCurrentStep}
          />

          {dataProductDefinition && (
            <DataProductDefinitionViewer
              className="data-product-builder__definition-viewer"
              dataProductDefinition={dataProductDefinition}
            />
          )}
        </GridColumn>

        <GridColumn variant={GridColumnVariant.TwoThirds}>
          <DataProductBuilderStepContent
            formId={ACTIVE_STEP_FORM_ID}
            currentStep={currentStep}
            dataProduct={dataProduct}
            availableDataSources={availableDataSources}
            onCreated={onCreated}
            onStepSaveSuccess={handleStepSaveSuccess}
            onStepSubmittingChange={setIsStepSubmitting}
          />

          <SectionBreak size={SectionBreakSize.Medium} visible />

          <DataProductBuilderFooter
            formId={ACTIVE_STEP_FORM_ID}
            currentStep={currentStep}
            dataProduct={dataProduct}
            dataProductDefinition={dataProductDefinition}
            canEditDataProduct={canEditDataProduct}
            stepMetaByStep={stepMetaByStep}
            isStepSubmitting={isStepSubmitting}
            onPreviousStep={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
          />
        </GridColumn>
      </GridRow>
    </>
  );
};
