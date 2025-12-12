import { type ValidationError } from '../../../errors'
import { type DataProduct, DataProductState } from '../../../types/entities/data-product'
import { type DataProductFormMetadata } from '../../../types/view-models/data-products/data-product-form-metadata'
import { type DataProductFormValues } from '../../../schemas/data-product/data-product-form.schema'
import { type RouteDefinitions } from '../../../utils/route-definitions'
import { DataProductFormPresenter } from '../data-product-form'
import { type DataProductPageViewModel, type DataProductQualityMetricsViewModel } from './data-product-page-view-model'
import { DataProductActionsPresenter } from './data-product-actions'

export class DataProductPagePresenter {
  constructor(
    private readonly dataProduct: DataProduct,
    private readonly formMetadata: DataProductFormMetadata,
    private readonly formValues: DataProductFormValues,
    private readonly routeDefinitions: RouteDefinitions,
    private readonly validationError: ValidationError | null = null,
  ) {}

  private get isFormDisabled(): boolean {
    return this.dataProduct.state !== DataProductState.Draft
  }

  private get qualityMetrics(): DataProductQualityMetricsViewModel {
    const { qualityMetrics, metadata } = this.dataProduct
    const { lastPreviewedAt } = metadata
    const { accuracy, consistency } = qualityMetrics || {} // TODO-IMPLEMENT: Remove empty object fallback after backend implements "qualityMetrics"

    return [
      {
        name: 'Accuracy',
        value: accuracy,
        lastUpdatedAt: lastPreviewedAt,
      },
      {
        name: 'Consistency',
        value: consistency,
        lastUpdatedAt: lastPreviewedAt,
      },
    ]
  }

  present(): DataProductPageViewModel {
    const formPresenter = new DataProductFormPresenter({
      metadata: this.formMetadata,
      values: this.formValues,
      disabled: this.isFormDisabled,
      validationError: this.validationError,
    })

    const form = formPresenter.present()

    const actionsPresenter = new DataProductActionsPresenter(this.dataProduct, form.id, this.routeDefinitions)

    const actions = actionsPresenter.present()

    return {
      dataProduct: this.dataProduct,
      qualityMetrics: this.qualityMetrics,
      form,
      actions,
      errorSummaryList: form.errors?.errorSummaryList,
    }
  }
}
