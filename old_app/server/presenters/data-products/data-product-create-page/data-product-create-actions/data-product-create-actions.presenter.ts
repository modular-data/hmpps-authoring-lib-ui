import { type RouteDefinitions } from '../../../../utils/route-definitions'
import { type DataProductCreateActionsViewModel } from './data-product-create-actions.view-model'

export class DataProductCreateActionsPresenter {
  constructor(
    private readonly formId: string,
    private readonly routeDefinitions: RouteDefinitions,
  ) {}

  present(): DataProductCreateActionsViewModel {
    return {
      formId: this.formId,
      cancelUrl: this.routeDefinitions.dataProducts.createUrl(),
    }
  }
}
