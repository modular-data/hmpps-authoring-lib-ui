import { type TextOrHtml } from './common'

export type ErrorSummaryListItem = TextOrHtml & {
  href?: string
}

export type ErrorSummaryList = ErrorSummaryListItem[]
