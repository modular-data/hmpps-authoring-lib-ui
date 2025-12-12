import { type DataProduct, DataProductState } from '../../../../types/entities/data-product'
import { type RouteDefinitions } from '../../../../utils/route-definitions'
import { assertNever } from '../../../../types/utils/assert-never'
import {
  type DataProductPrimaryAction,
  type DataProductSecondaryActions,
  type DataProductActionsViewModel,
} from './data-product-actions.view-model'

const ACTIONS_FORM_ID = 'data-product-actions-form'

const PREVIEW_DATA_ACTION = 'preview'

export class DataProductActionsPresenter {
  constructor(
    private readonly dataProduct: DataProduct,
    private readonly entityFormId: string,
    private readonly routeDefinitions: RouteDefinitions,
  ) {}

  present(): DataProductActionsViewModel {
    return {
      primaryAction: this.getPrimaryAction(),
      secondaryActions: this.getSecondaryActions(),
      actionsFormId: ACTIONS_FORM_ID,
    }
  }

  private getPrimaryAction(): DataProductPrimaryAction {
    const { state } = this.dataProduct

    switch (state) {
      case DataProductState.Draft:
        return {
          text: 'Save',
          type: 'submit',
          preventDoubleClick: true,
          attributes: {
            form: this.entityFormId,
          },
        }

      case DataProductState.Published:
      case DataProductState.Launched:
        return {
          text: 'Promote',
          disabled: state === DataProductState.Launched,
        }

      default:
        return assertNever(state)
    }
  }

  private getSecondaryActions(): DataProductSecondaryActions {
    const { id, state, metadata } = this.dataProduct

    switch (state) {
      case DataProductState.Draft:
        return [
          {
            element: 'input',
            text: 'Preview',
            type: 'submit',
            attributes: {
              'data-action': PREVIEW_DATA_ACTION,
              form: ACTIONS_FORM_ID,
              formtarget: '_blank',
              formaction: this.routeDefinitions.dataProductPreview.createUrl(id),
            },
          },
          {
            element: 'input',
            text: 'Approve & Publish',
            type: 'submit',
            disabled: !metadata.lastPreviewedAt,
            attributes: {
              form: ACTIONS_FORM_ID,
              formaction: this.routeDefinitions.dataProductApproveAndPublish.createUrl(id),
            },
          },
          { text: 'Collaborate', disabled: true },
          { text: 'Cancel', href: this.routeDefinitions.dataProducts.createUrl() },
        ]

      case DataProductState.Published:
      case DataProductState.Launched:
        return [
          {
            text: 'Edit as a new version',
            disabled: true,
          },
          {
            text: 'Go to Data Products',
            href: this.routeDefinitions.dataProducts.createUrl(),
          },
        ]

      default:
        return assertNever(state)
    }
  }
}
