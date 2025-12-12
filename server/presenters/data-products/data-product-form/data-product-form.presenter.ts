import { v4 as uuid } from 'uuid'
import { type ValidationError } from '../../../errors'
import { type DataProductFormMetadata } from '../../../types/view-models/data-products/data-product-form-metadata'
import { type DataProductFormValues } from '../../../schemas/data-product/data-product-form.schema'
import { type FormFieldPath } from '../../../types/utils/form-field-path'
import { type TupleOf } from '../../../types/utils/tuple-of'
import { type DataProductFormViewModel } from './data-product-form.view-model'
import { ValidationErrorsPresenter } from '../../common/validation-errors'

const fieldOrder: TupleOf<FormFieldPath<DataProductFormValues>> = [
  'name',
  'metadata[version]',
  'domainName',
  'metadata[owner]',
  'assets[dataset]',
  'outputs[report]',
  'policies',
  'description',
  'tags',
]

interface DataProductFormPresenterOptions {
  id?: string
  metadata: DataProductFormMetadata
  values: DataProductFormValues
  disabled?: boolean
  validationError?: ValidationError | null
}

export class DataProductFormPresenter {
  private readonly options: DataProductFormPresenterOptions

  constructor(options: DataProductFormPresenterOptions) {
    this.options = {
      id: uuid(),
      disabled: false,
      validationError: null,
      ...options,
    }
  }

  present(): DataProductFormViewModel {
    const { id, metadata, values, disabled, validationError } = this.options

    const errors = validationError ? new ValidationErrorsPresenter(validationError, fieldOrder).present() : null

    return {
      id,
      metadata,
      values,
      disabled,
      errors,
    }
  }
}
