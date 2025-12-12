import { type TextOrHtml } from './common'

export type GdsButton = TextOrHtml & {
  classes?: string
  element?: 'button' | 'a' | 'input'
  name?: string
  type?: 'submit' | 'reset' | 'button'
  value?: string
  disabled?: boolean
  href?: string
  attributes?: Record<string, string>
  preventDoubleClick?: boolean
  isStartButton?: boolean
}
