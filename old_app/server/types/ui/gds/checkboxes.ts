import { type TextOrHtml } from './common'
import { type GdsHint } from './hint'

export interface GdsCheckboxesLabel {
  classes?: string
  attributes?: Record<string, string>
}

export type GdsCheckboxesItem = TextOrHtml & {
  id?: string
  name?: string
  value: string
  label?: GdsCheckboxesLabel
  hint?: GdsHint
  divider?: string
  checked?: boolean
  behaviour?: 'exclusive'
  disabled?: boolean
  attributes?: Record<string, unknown>
}

export type GdsCheckboxesItems = GdsCheckboxesItem[]
