import { type Dataset, DatasetState } from '../../../../types/entities/dataset'
import { type RouteDefinitions } from '../../../../utils/route-definitions'
import { assertNever } from '../../../../types/utils/assert-never'
import {
  type DatasetPrimaryAction,
  type DatasetSecondaryActions,
  type DatasetActionsViewModel,
} from './dataset-actions.view-model'

const ACTIONS_FORM_ID = 'dataset-actions-form'

const PREVIEW_DATA_ACTION = 'preview'

export class DatasetActionsPresenter {
  constructor(
    private readonly dataset: Dataset,
    private readonly entityFormId: string,
    private readonly routeDefinitions: RouteDefinitions,
  ) {}

  present(): DatasetActionsViewModel {
    return {
      primaryAction: this.getPrimaryAction(),
      secondaryActions: this.getSecondaryActions(),
      actionsFormId: ACTIONS_FORM_ID,
    }
  }

  private getPrimaryAction(): DatasetPrimaryAction | null {
    const { state } = this.dataset

    switch (state) {
      case DatasetState.Draft:
        return {
          text: 'Save',
          type: 'submit',
          preventDoubleClick: true,
          attributes: {
            form: this.entityFormId,
          },
        }

      case DatasetState.Published:
      case DatasetState.Launched:
        return {
          text: 'Promote',
          disabled: state === DatasetState.Launched,
        }

      default:
        return assertNever(state)
    }
  }

  private getSecondaryActions(): DatasetSecondaryActions {
    const { id, state, metadata } = this.dataset

    switch (state) {
      case DatasetState.Draft:
        return [
          {
            element: 'input',
            text: 'Preview',
            type: 'submit',
            attributes: {
              'data-action': PREVIEW_DATA_ACTION,
              form: ACTIONS_FORM_ID,
              formtarget: '_blank',
              formaction: this.routeDefinitions.datasetPreview.createUrl(id),
            },
          },
          {
            element: 'input',
            text: 'Approve & Publish',
            type: 'submit',
            disabled: !metadata.previewedAt,
            attributes: {
              form: ACTIONS_FORM_ID,
              formaction: this.routeDefinitions.datasetApproveAndPublish.createUrl(id),
            },
          },
          { text: 'Cancel', href: this.routeDefinitions.datasets.createUrl() },
        ]

      case DatasetState.Published:
      case DatasetState.Launched:
        return [
          {
            text: 'Edit as a new version',
            disabled: true,
          },
          {
            text: 'Go to Datasets',
            href: this.routeDefinitions.datasets.createUrl(),
          },
        ]

      default:
        return assertNever(state)
    }
  }
}
