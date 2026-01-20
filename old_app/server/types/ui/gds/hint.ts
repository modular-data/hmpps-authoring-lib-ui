import { type TextOrHtml } from './common'

export type GdsHint = TextOrHtml & {
  id?: string
  classes?: string
  attributes?: Record<string, string>
}
