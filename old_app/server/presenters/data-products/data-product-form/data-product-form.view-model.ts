import { type ValidationErrorsViewModel } from '../../common/validation-errors'
import { type DataProductFormMetadata } from '../../../types/view-models/data-products/data-product-form-metadata'
import { type DataProductFormValues } from '../../../schemas/data-product/data-product-form.schema'

export interface DataProductFormViewModel {
  id?: string
  metadata: DataProductFormMetadata
  values: DataProductFormValues
  disabled?: boolean
  errors: ValidationErrorsViewModel | null
}
