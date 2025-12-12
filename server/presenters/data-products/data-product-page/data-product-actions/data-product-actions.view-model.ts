import { type GdsButton } from '../../../../types/ui/gds/button'
import { type MojButtonMenuItems } from '../../../../types/ui/moj/button-menu'

export type DataProductPrimaryAction = GdsButton

export type DataProductSecondaryActions = MojButtonMenuItems

export interface DataProductActionsViewModel {
  primaryAction: DataProductPrimaryAction
  secondaryActions: DataProductSecondaryActions
  actionsFormId: string
}
