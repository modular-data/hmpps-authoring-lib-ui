import { type Alert, type AlertVariant } from '../types/ui/moj/alert'
import { type PartialKeys } from '../types/utils/partial-keys'

const defaultTitleMap: Record<AlertVariant, string> = {
  success: 'Success',
  information: 'Information',
  warning: 'Warning',
  error: 'Error',
}

const defaultAlertOptions = {
  dismissible: true,
} as const

const makeAlertCreator = <TVariant extends Alert['variant']>(variant: TVariant) => {
  return (options: PartialKeys<Alert, 'variant' | 'title'>): Alert => ({
    ...defaultAlertOptions,
    variant,
    title: defaultTitleMap[variant],
    ...options,
  })
}

export const createSuccessAlert = makeAlertCreator('success')

export const createInformationAlert = makeAlertCreator('information')

export const createWarningAlert = makeAlertCreator('warning')

export const createErrorAlert = makeAlertCreator('error')
