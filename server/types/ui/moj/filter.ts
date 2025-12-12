import { type TextOrHtml } from '../gds/common'

export interface MojSelectedFiltersCategoryItem {
  text: string
  href: string
}

export type MojSelectedFiltersCategoryItems = MojSelectedFiltersCategoryItem[]

export interface MojSelectedFiltersCategory {
  heading: TextOrHtml
  items: MojSelectedFiltersCategoryItems
}

export type MojSelectedFiltersCategories = MojSelectedFiltersCategory[]
