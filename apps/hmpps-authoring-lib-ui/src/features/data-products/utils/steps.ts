import {
  DataProductStateType,
  type DataProductDefinition,
} from '@/generated/core-api';
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
  dataProduct?: DataProductDefinition,
): DataProductBuilderStepCompletionMap => ({
  // TODO: Improve Overview completion logic after first priority tasks are completed
  [DataProductBuilderStep.Overview]: !!dataProduct?.name,
  [DataProductBuilderStep.DataSources]: hasItems(dataProduct?.datasource),
  [DataProductBuilderStep.Datasets]: hasItems(dataProduct?.dataset),
  [DataProductBuilderStep.Policies]: hasItems(dataProduct?.policy),
  [DataProductBuilderStep.Reports]: hasItems(dataProduct?.report),
});

export const deriveStepMetaByStep = (
  dataProduct?: DataProductDefinition,
): DataProductBuilderStepMetaMap => {
  const completedByStep = deriveStepCompletionMap(dataProduct);
  const isDraftState = dataProduct?.state === DataProductStateType.DRAFT;

  const { stepMetaByStep } = DATA_PRODUCT_BUILDER_STEP_ORDER.reduce(
    (accumulator, step) => {
      const completed = completedByStep[step];
      const available = !isDraftState || accumulator.allPreviousStepsCompleted;

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
