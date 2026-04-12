import { DataProductStateType, type DataProduct } from '@/generated/core-api';
import { DATA_PRODUCT_BUILDER_LAST_STEP } from '../../constants/steps';
import {
  type DataProductBuilderStep,
  type DataProductBuilderStepMetaMap,
} from '../../types/steps';
import { areAllStepsCompleted } from '../../utils/steps';

export const shouldShowPreviewAction = (
  stepMetaByStep: DataProductBuilderStepMetaMap,
  dataProduct?: DataProduct,
): boolean => {
  if (!dataProduct) {
    return false;
  }

  return (
    dataProduct.state === DataProductStateType.DRAFT &&
    areAllStepsCompleted(stepMetaByStep)
  );
};

export const getStepSubmitLabel = (
  currentStep: DataProductBuilderStep,
  dataProduct?: DataProduct,
): string => {
  if (!dataProduct) {
    return 'Create and continue';
  }

  if (currentStep === DATA_PRODUCT_BUILDER_LAST_STEP) {
    return 'Save';
  }

  return 'Save and continue';
};
