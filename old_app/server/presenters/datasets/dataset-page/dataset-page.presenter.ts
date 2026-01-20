import { type ValidationError } from '../../../errors'
import { type Dataset, DatasetState } from '../../../types/entities/dataset'
import { type DatasetFormMetadata } from '../../../types/view-models/datasets/dataset-form-metadata'
import { type DatasetFormValues } from '../../../schemas/dataset/dataset-form.schema'
import { type RouteDefinitions } from '../../../utils/route-definitions'
import { type DatasetPageViewModel } from './dataset-page.view-model'
import { DatasetFormPresenter } from '../dataset-form'
import { DatasetActionsPresenter } from './dataset-actions'

export class DatasetPagePresenter {
  constructor(
    private readonly dataset: Dataset,
    private readonly formMetadata: DatasetFormMetadata,
    private readonly formValues: DatasetFormValues,
    private readonly routeDefinitions: RouteDefinitions,
    private readonly validationError: ValidationError | null = null,
  ) {}

  private get isFormDisabled(): boolean {
    return this.dataset.state !== DatasetState.Draft
  }

  present(): DatasetPageViewModel {
    const formPresenter = new DatasetFormPresenter({
      metadata: this.formMetadata,
      values: this.formValues,
      disabled: this.isFormDisabled,
      validationError: this.validationError,
    })

    const form = formPresenter.present()

    const actionsPresenter = new DatasetActionsPresenter(this.dataset, form.id!, this.routeDefinitions)

    const actions = actionsPresenter.present()

    return {
      dataset: this.dataset,
      form,
      actions,
      errorSummaryList: form.errors?.errorSummaryList,
    }
  }
}
