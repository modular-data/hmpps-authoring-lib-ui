import { type SubPageViewModel } from '../../common/sub-page'
import { type DatasetFormViewModel } from '../dataset-form'
import { type DatasetCreateActionsViewModel } from './dataset-create-actions'

export interface DatasetCreatePageViewModel extends SubPageViewModel {
  form: DatasetFormViewModel
  actions: DatasetCreateActionsViewModel
}
