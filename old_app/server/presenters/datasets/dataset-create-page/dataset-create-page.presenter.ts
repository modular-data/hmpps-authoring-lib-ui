import { type ValidationError } from '../../../errors'
import { type RouteDefinitions } from '../../../utils/route-definitions'
import { type DatasetCreatePageViewModel } from './dataset-create-page.view-model'
import { type DatasetFormMetadata } from '../../../types/view-models/datasets/dataset-form-metadata'
import { type DatasetFormValues } from '../../../schemas/dataset/dataset-form.schema'
import { DatasetFormPresenter } from '../dataset-form'
import { DatasetCreateActionsPresenter } from './dataset-create-actions'

export class DatasetCreatePagePresenter {
  constructor(
    private readonly formMetadata: DatasetFormMetadata,
    private readonly formValues: DatasetFormValues,
    private readonly routeDefinitions: RouteDefinitions,
    private readonly validationError: ValidationError | null = null,
  ) {}

  present(): DatasetCreatePageViewModel {
    const formPresenter = new DatasetFormPresenter({
      metadata: this.formMetadata,
      values: this.formValues,
      validationError: this.validationError,
    })

    const form = formPresenter.present()

    const actionsPresenter = new DatasetCreateActionsPresenter(form.id, this.routeDefinitions)

    const actions = actionsPresenter.present()

    return {
      form,
      actions,
      errorSummaryList: form.errors?.errorSummaryList,
    }
  }
}
