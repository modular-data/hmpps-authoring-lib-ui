import { v4 as uuid } from 'uuid'
import { type ValidationError } from '../../../errors'
import { type DatasetFormMetadata } from '../../../types/view-models/datasets/dataset-form-metadata'
import { type DatasetFormValues } from '../../../schemas/dataset/dataset-form.schema'
import { type FormFieldPath } from '../../../types/utils/form-field-path'
import { type TupleOf } from '../../../types/utils/tuple-of'
import { type DatasetFormViewModel } from './dataset-form.view-model'
import { ValidationErrorsPresenter } from '../../common/validation-errors'

const fieldOrder: TupleOf<FormFieldPath<DatasetFormValues>> = [
  'name',
  'metadata[version]',
  'domainName',
  'metadata[owner]',
  'dataSourceId',
  'description',
  'tags',
  'query',
]

interface DatasetFormPresenterOptions {
  id?: string
  metadata: DatasetFormMetadata
  values: DatasetFormValues
  disabled?: boolean
  validationError?: ValidationError | null
}

export class DatasetFormPresenter {
  private readonly options: DatasetFormPresenterOptions

  constructor(options: DatasetFormPresenterOptions) {
    this.options = {
      id: uuid(),
      disabled: false,
      validationError: null,
      ...options,
    }
  }

  present(): DatasetFormViewModel {
    const { id, metadata, values, disabled, validationError } = this.options

    const errors = validationError ? new ValidationErrorsPresenter(validationError, fieldOrder).present() : null

    const dataSourceOptions = metadata.dataSources.map(dataSource => ({
      value: dataSource.id,
      text: dataSource.name,
      selected: values.dataSourceId === dataSource.id,
    }))

    return {
      id,
      metadata,
      values,
      dataSourceOptions, // TODO: Prototype: Revisit it and think about combining it with metadata
      disabled,
      errors,
    }
  }
}
