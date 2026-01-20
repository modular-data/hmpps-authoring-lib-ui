import { type TextOrHtml } from './common'

export type GdsTableHeader = TextOrHtml & {
  classes?: string
  format?: 'numeric'
  colspan?: number
  rowspan?: number
  attributes?: Record<string, string>
}

export type GdsTableHead = GdsTableHeader[]

export type GdsTableCell = TextOrHtml & {
  classes?: string
  format?: 'numeric'
  colspan?: number
  rowspan?: number
  attributes?: Record<string, string>
}

export type GdsTableRow = GdsTableCell[]

export type GdsTableRows = GdsTableRow[]

export interface GdsTable {
  classes?: string
  captionClasses?: string
  head?: GdsTableHead
  rows: GdsTableRows
  caption?: string
  firstCellIsHeader?: boolean
  attributes?: Record<string, string>
}
