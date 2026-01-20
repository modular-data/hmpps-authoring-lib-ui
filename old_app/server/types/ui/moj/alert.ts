import { type TextOrHtml } from '../gds/common'

export type AlertVariant = 'success' | 'information' | 'warning' | 'error'

export type Alert = {
  variant: AlertVariant
  title: string
  showTitleAsHeading?: boolean
  dismissible?: boolean
} & TextOrHtml

export type Alerts = Alert[]
