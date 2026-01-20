import { type SubPageViewModel } from '../../common/sub-page'
import { type Dataset } from '../../../types/entities/dataset'
import { type DatasetFormViewModel } from '../dataset-form'
import { type DatasetActionsViewModel } from './dataset-actions'

export interface DatasetPageViewModel extends SubPageViewModel {
  dataset: Dataset
  form: DatasetFormViewModel
  actions: DatasetActionsViewModel
}
