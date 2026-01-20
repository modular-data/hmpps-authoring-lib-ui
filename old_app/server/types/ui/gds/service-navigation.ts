import { type TextOrHtml } from './common'

type ServiceNavigationItem = TextOrHtml & {
  current?: boolean
  active?: boolean
  href?: string
}

export type ServiceNavigationItems = ServiceNavigationItem[]
