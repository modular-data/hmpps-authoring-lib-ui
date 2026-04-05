export enum DataProductBuilderStep {
  Overview = 'overview',
  DataSources = 'data-sources',
  Datasets = 'datasets',
  Policies = 'policies',
  Reports = 'reports',
}

export type DataProductBuilderStepDefinition = {
  step: DataProductBuilderStep;
  title: string;
  description: string;
  required: boolean;
};

export type DataProductBuilderStepDefinitions =
  DataProductBuilderStepDefinition[];

export type DataProductBuilderStepMeta = {
  completed: boolean;
  available: boolean;
};

export type DataProductBuilderStepMetaMap = Record<
  DataProductBuilderStep,
  DataProductBuilderStepMeta
>;
