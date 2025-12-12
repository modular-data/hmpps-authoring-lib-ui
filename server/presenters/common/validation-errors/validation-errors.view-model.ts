import { type ErrorSummaryList } from '../../../types/ui/gds/error-summary'
import { type TextOrHtml } from '../../../types/ui/gds/common'

export interface ValidationErrorsViewModel {
  errorSummaryList: ErrorSummaryList
  fields: Record<string, TextOrHtml>
}
