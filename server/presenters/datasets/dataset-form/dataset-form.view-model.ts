import { type ValidationErrorsViewModel } from '../../common/validation-errors'
import { type DatasetFormMetadata } from '../../../types/view-models/datasets/dataset-form-metadata'
import { type DatasetFormValues } from '../../../schemas/dataset/dataset-form.schema'

export interface SelectOption {
  // TODO: Prototype: Extract it to a shared type
  value: string
  text: string
  selected?: boolean
}

export interface DatasetFormViewModel {
  // TODO: Prototype: Fully revisit this type and relative code, especially the use of SelectOption
  id?: string
  metadata: DatasetFormMetadata
  values: DatasetFormValues
  dataSourceOptions: SelectOption[]
  disabled?: boolean
  errors: ValidationErrorsViewModel | null
}
