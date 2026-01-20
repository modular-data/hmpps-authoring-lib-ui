interface MojPaginationPageItem {
  text: string
  href: string
  selected?: boolean
}

interface MojPaginationDotItem {
  type: 'dots'
}

export type MojPaginationItem = MojPaginationPageItem | MojPaginationDotItem

export type MojPaginationItems = MojPaginationItem[]

export interface MojPaginationResults {
  count: number
  from: number
  to: number
  text?: string
}

export interface MojPaginationLink {
  text: string
  href: string
}

export interface MojPaginationArgs {
  classes?: string
  items: MojPaginationItems
  results?: MojPaginationResults
  previous?: MojPaginationLink
  next?: MojPaginationLink
}
