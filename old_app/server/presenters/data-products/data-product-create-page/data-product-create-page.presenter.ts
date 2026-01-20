import { type ValidationError } from '../../../errors'
import { type RouteDefinitions } from '../../../utils/route-definitions'
import { type DataProductCreatePageViewModel } from './data-product-create-page.view-model'
import { type DataProductFormMetadata } from '../../../types/view-models/data-products/data-product-form-metadata'
import { type DataProductFormValues } from '../../../schemas/data-product/data-product-form.schema'
import { DataProductFormPresenter } from '../data-product-form'
import { DataProductCreateActionsPresenter } from './data-product-create-actions'

export class DataProductCreatePagePresenter {
  constructor(
    private readonly formMetadata: DataProductFormMetadata,
    private readonly formValues: DataProductFormValues,
    private readonly routeDefinitions: RouteDefinitions,
    private readonly validationError: ValidationError | null = null,
  ) {}

  present(): DataProductCreatePageViewModel {
    const formPresenter = new DataProductFormPresenter({
      metadata: this.formMetadata,
      values: this.formValues,
      validationError: this.validationError,
    })

    const form = formPresenter.present()

    const actionsPresenter = new DataProductCreateActionsPresenter(form.id, this.routeDefinitions)

    const actions = actionsPresenter.present()

    return {
      form,
      actions,
      errorSummaryList: form.errors?.errorSummaryList,
    }
  }
}
