'use client';

import {
  Button,
  ButtonGroup,
  ButtonVariant,
} from '@modular-data/gds-components';
import { type DataProductDefinition } from '@/generated/core-api';
import {
  type DataProductBuilderStep,
  type DataProductBuilderStepMetaMap,
} from '../../types/steps';
import { downloadDataProductDefinition } from '../../utils/download-data-product-definition';
import { getStepSubmitLabel, shouldShowPreviewAction } from './helpers';

interface DataProductBuilderFooterProps {
  className?: string;
  formId: string;
  dataProduct?: DataProductDefinition;
  currentStep: DataProductBuilderStep;
  stepMetaByStep: DataProductBuilderStepMetaMap;
  canEditDataProduct: boolean;
  isStepSubmitting: boolean;
  onPreviousStep?: () => void;
}

export const DataProductBuilderFooter = ({
  className,
  formId,
  dataProduct,
  currentStep,
  stepMetaByStep,
  canEditDataProduct,
  isStepSubmitting,
  onPreviousStep,
}: DataProductBuilderFooterProps) => {
  const canPreviewDataProduct = shouldShowPreviewAction(
    stepMetaByStep,
    dataProduct,
  );
  const stepSubmitLabel = getStepSubmitLabel(currentStep, dataProduct);

  const handlePreview = () => {
    window.alert('TODO-IMPLEMENT: The Preview should be implemented');
  };

  return (
    <div className={className}>
      <ButtonGroup>
        {canEditDataProduct && (
          <>
            {onPreviousStep && (
              <Button
                type="button"
                variant={ButtonVariant.Secondary}
                disabled={isStepSubmitting}
                onClick={onPreviousStep}
              >
                Back
              </Button>
            )}
            <Button type="submit" form={formId} disabled={isStepSubmitting}>
              {stepSubmitLabel}
            </Button>
          </>
        )}

        {canPreviewDataProduct && (
          <Button
            type="button"
            variant={ButtonVariant.Secondary}
            disabled={isStepSubmitting}
            onClick={handlePreview}
          >
            Preview
          </Button>
        )}

        {dataProduct && (
          <Button
            type="button"
            variant={ButtonVariant.Secondary}
            disabled={isStepSubmitting}
            onClick={() => {
              // TODO-IMPLEMENT: Download the data product definition when backend is implemented
              downloadDataProductDefinition(dataProduct);
            }}
          >
            Download DPD
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};
