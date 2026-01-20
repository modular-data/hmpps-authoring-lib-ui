import { DatasetState } from '../types/entities/dataset'

export const DATASET_DEFAULT_VERSION = '0.0.1'

export const RECENT_DATASET_THRESHOLD_MS = 30 * 60 * 1000 // 30 minutes

export const datasetStateLabelMap: Record<DatasetState, string> = {
  [DatasetState.Draft]: 'Draft',
  [DatasetState.Published]: 'Published',
  [DatasetState.Launched]: 'Launched',
}

export const datasetStateTagColourMap: Record<DatasetState, string> = {
  [DatasetState.Draft]: 'blue',
  [DatasetState.Published]: 'yellow',
  [DatasetState.Launched]: 'green',
}
