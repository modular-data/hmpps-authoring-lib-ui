import { type SubPageViewModel } from '../../common/sub-page'
import { type DataProductFormViewModel } from '../data-product-form'
import { type DataProductCreateActionsViewModel } from './data-product-create-actions'

export interface DataProductCreatePageViewModel extends SubPageViewModel {
  form: DataProductFormViewModel
  actions: DataProductCreateActionsViewModel
}
