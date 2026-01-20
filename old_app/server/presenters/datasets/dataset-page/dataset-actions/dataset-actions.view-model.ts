import { type GdsButton } from '../../../../types/ui/gds/button'
import { type MojButtonMenuItems } from '../../../../types/ui/moj/button-menu'

export type DatasetPrimaryAction = GdsButton

export type DatasetSecondaryActions = MojButtonMenuItems

export interface DatasetActionsViewModel {
  primaryAction: DatasetPrimaryAction
  secondaryActions: DatasetSecondaryActions
  actionsFormId: string
}
