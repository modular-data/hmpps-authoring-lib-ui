import {
  DataProductBuilderStep,
  type DataProductBuilderStepDefinition,
  type DataProductBuilderStepDefinitions,
} from '../types/steps';

type DataProductBuilderStepDefinitionsMap = {
  [TStep in DataProductBuilderStep]: DataProductBuilderStepDefinition & {
    step: TStep;
  };
};

export const DATA_PRODUCT_BUILDER_STEP_ORDER = Object.values(
  DataProductBuilderStep,
);

export const DATA_PRODUCT_BUILDER_LAST_STEP =
  DATA_PRODUCT_BUILDER_STEP_ORDER[DATA_PRODUCT_BUILDER_STEP_ORDER.length - 1];

export const DATA_PRODUCT_BUILDER_STEP_DEFINITIONS_MAP: DataProductBuilderStepDefinitionsMap =
  {
    [DataProductBuilderStep.Overview]: {
      step: DataProductBuilderStep.Overview,
      title: 'Overview',
      description: 'Basic information about your data product',
    },
    [DataProductBuilderStep.DataSources]: {
      step: DataProductBuilderStep.DataSources,
      title: 'Data Sources',
      description: 'Select data sources for your data product',
    },
    [DataProductBuilderStep.Datasets]: {
      step: DataProductBuilderStep.Datasets,
      title: 'Datasets',
      description: 'Define datasets with queries and schemas',
    },
    [DataProductBuilderStep.Policies]: {
      step: DataProductBuilderStep.Policies,
      title: 'Policies',
      description: 'Configure security policies',
    },
    [DataProductBuilderStep.Reports]: {
      step: DataProductBuilderStep.Reports,
      title: 'Reports',
      description: 'Create report definitions',
    },
  };

export const DATA_PRODUCT_BUILDER_STEP_DEFINITIONS: DataProductBuilderStepDefinitions =
  DATA_PRODUCT_BUILDER_STEP_ORDER.map(
    (step) => DATA_PRODUCT_BUILDER_STEP_DEFINITIONS_MAP[step],
  );
