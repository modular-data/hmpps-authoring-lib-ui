import { DataProductStateType, type DataProduct } from '@/generated/core-api';
import {
  DATA_PRODUCT_BUILDER_LAST_STEP,
  DATA_PRODUCT_BUILDER_STEP_ORDER,
} from '../constants/steps';
import {
  DataProductBuilderStep,
  type DataProductBuilderStepMetaMap,
} from '../types/steps';

type DataProductBuilderStepCompletionMap = Record<
  DataProductBuilderStep,
  boolean
>;

const hasItems = (items?: unknown[]): boolean => (items?.length ?? 0) > 0;

const deriveStepCompletionMap = (
  dataProduct?: DataProduct,
): DataProductBuilderStepCompletionMap => ({
  // TODO: Improve Overview completion logic after first priority tasks are completed
  [DataProductBuilderStep.Overview]: !!dataProduct?.name,
  [DataProductBuilderStep.DataSources]: hasItems(dataProduct?.datasource),
  [DataProductBuilderStep.Datasets]: hasItems(dataProduct?.dataset),
  [DataProductBuilderStep.Policies]: hasItems(dataProduct?.policy),
  [DataProductBuilderStep.Reports]: hasItems(dataProduct?.report),
});

export const deriveStepMetaByStep = (
  dataProduct?: DataProduct,
): DataProductBuilderStepMetaMap => {
  const completedByStep = deriveStepCompletionMap(dataProduct);

  const { stepMetaByStep } = DATA_PRODUCT_BUILDER_STEP_ORDER.reduce(
    (accumulator, step) => {
      const completed = completedByStep[step];
      let available = accumulator.allPreviousStepsCompleted;

      if (dataProduct && dataProduct.state !== DataProductStateType.DRAFT) {
        available = true;
      }

      accumulator.stepMetaByStep[step] = { completed, available };
      accumulator.allPreviousStepsCompleted &&= completed;

      return accumulator;
    },
    {
      stepMetaByStep: {} as DataProductBuilderStepMetaMap,
      allPreviousStepsCompleted: true,
    },
  );

  return stepMetaByStep;
};

export const areAllStepsCompleted = (
  stepMetaByStep: DataProductBuilderStepMetaMap,
): boolean => {
  return DATA_PRODUCT_BUILDER_STEP_ORDER.every(
    (step) => stepMetaByStep[step].completed,
  );
};

export const deriveDefaultStep = (
  stepMetaByStep: DataProductBuilderStepMetaMap,
): DataProductBuilderStep => {
  const firstIncompleteStep = DATA_PRODUCT_BUILDER_STEP_ORDER.find(
    (step) => !stepMetaByStep[step].completed,
  );

  return firstIncompleteStep ?? DATA_PRODUCT_BUILDER_LAST_STEP;
};

export const getPreviousAvailableStep = (
  currentStep: DataProductBuilderStep,
  stepMetaByStep: DataProductBuilderStepMetaMap,
): DataProductBuilderStep | null => {
  const currentStepIndex = DATA_PRODUCT_BUILDER_STEP_ORDER.indexOf(currentStep);

  if (currentStepIndex <= 0) {
    return null;
  }

  const previousStep = DATA_PRODUCT_BUILDER_STEP_ORDER.slice(
    0,
    currentStepIndex,
  ).findLast((step) => stepMetaByStep[step].available);

  return previousStep ?? null;
};
