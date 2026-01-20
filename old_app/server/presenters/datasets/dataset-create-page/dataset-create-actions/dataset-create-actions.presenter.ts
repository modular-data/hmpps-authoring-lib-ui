import { type RouteDefinitions } from '../../../../utils/route-definitions'
import { type DatasetCreateActionsViewModel } from './dataset-create-actions.view-model'

export class DatasetCreateActionsPresenter {
  constructor(
    private readonly formId: string,
    private readonly routeDefinitions: RouteDefinitions,
  ) {}

  present(): DatasetCreateActionsViewModel {
    return {
      formId: this.formId,
      cancelUrl: this.routeDefinitions.datasets.createUrl(),
    }
  }
}
