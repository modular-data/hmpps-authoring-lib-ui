import { type DeepKeyOf } from '../../../../types/utils/deep-key-of'
import { type DeepValue } from '../../../../types/utils/deep-value'
import { type ElementOf } from '../../../../types/utils/element-of'
import { type MojSelectedFiltersCategories, type MojSelectedFiltersCategory } from '../../../../types/ui/moj/filter'
import { mergeQueryParams, stringifyQueryParams } from '../../../queryParams'
import { logger } from '../../../../logger'

type DefaultFilterValues = Record<string, unknown>

type FilterValuesOf<
  TQueryParams extends DefaultFilterValues,
  TFiltersPath extends keyof TQueryParams,
> = DefaultFilterValues & TQueryParams[TFiltersPath]

type FilterKeyOf<TFilterValues extends DefaultFilterValues> = DeepKeyOf<TFilterValues>

type RangeValue = {
  from?: string
  to?: string
}

export class MojSelectedFiltersBuilder<
  TQueryParams extends DefaultFilterValues,
  TFiltersPath extends keyof TQueryParams = 'filters',
  TFilterValues extends FilterValuesOf<TQueryParams, TFiltersPath> = FilterValuesOf<TQueryParams, TFiltersPath>,
  TFiltersKey extends FilterKeyOf<TFilterValues> = FilterKeyOf<TFilterValues>,
> {
  private categories: MojSelectedFiltersCategories = []

  private currentCategory?: MojSelectedFiltersCategory

  constructor(
    private readonly basePath: string,
    private readonly queryParams?: TQueryParams,
    private readonly filtersPath: TFiltersPath = 'filters' as TFiltersPath,
  ) {}

  private static isRangeValue(value: unknown): value is RangeValue {
    return typeof value === 'object' && ('from' in value || 'to' in value)
  }

  category(categoryName: string): this {
    const category: MojSelectedFiltersCategory = {
      heading: { text: categoryName },
      items: [],
    }

    this.categories.push(category)
    this.currentCategory = category

    return this
  }

  item(text: string, href: string): this {
    if (!this.currentCategory) {
      throw new Error('Must call .category() before item creation.')
    }

    this.currentCategory.items.push({ text, href })

    return this
  }

  addText(key: TFiltersKey): this {
    const filterValues = this.getFilterValues()
    const value = filterValues?.[key]

    if (typeof value === 'string' && value.trim()) {
      this.item(value, this.getFilterRemoveHrefByKey(key))
    }

    return this
  }

  addRange(key: TFiltersKey, label: string): this {
    const filterValues = this.getFilterValues()
    const range = filterValues?.[key]

    if (!MojSelectedFiltersBuilder.isRangeValue(range)) {
      logger.warn(`MojSelectedFiltersBuilder: Invalid range value for key "${key}"`)

      return this
    }

    const { from, to } = range

    if (from || to) {
      let text = `${label}: `
      const href = this.getFilterRemoveHrefByKey(key)

      if (from) {
        text += from
      }

      text += ' - '

      if (to) {
        text += to
      }

      this.item(text, href)
    }

    return this
  }

  addSelections<TAddSelectionKey extends TFiltersKey, TValue = ElementOf<DeepValue<TFilterValues, TAddSelectionKey>>>(
    key: TAddSelectionKey,
    options?: {
      getText?: (value: TValue) => string
      getRemoveHref?: (key: TAddSelectionKey, value: TValue) => string
    },
  ): this {
    const filterValues = this.getFilterValues()
    const values = [].concat(filterValues?.[key] || [])

    const defaultGetText: typeof options.getText = value => String(value)

    const getText = options?.getText ?? defaultGetText
    const getRemoveHref = options?.getRemoveHref ?? this.getFilterRemoveHrefByKey.bind(this)

    values.forEach(value => {
      const text = getText(value)
      const href = getRemoveHref(key, value)

      this.item(text, href)
    })

    return this
  }

  build(): MojSelectedFiltersCategories {
    return this.categories.filter(category => category.items.length > 0)
  }

  private getFilterRemoveHrefByKey(key: TFiltersKey, value?: unknown): string {
    const filterValues = this.getFilterValues()
    let nextValues

    if (value !== undefined) {
      const currentValues = filterValues?.[key]

      nextValues = this.toArray(currentValues).filter(currentValue => currentValue !== value)
    }

    const mergedQueryParams = mergeQueryParams(this.queryParams, {
      [this.filtersPath]: {
        ...filterValues,
        [key]: nextValues,
        page: undefined,
      },
    })
    const queryString = stringifyQueryParams(mergedQueryParams)

    return `${this.basePath}${queryString}`
  }

  private getFilterValues(): TFilterValues | undefined {
    const value = this.queryParams?.[this.filtersPath]

    return value ? (value as TFilterValues) : undefined
  }

  private toArray<TValue>(value: TValue | TValue[] | undefined): TValue[] {
    if (value === undefined) {
      return []
    }

    return Array.isArray(value) ? value : [value]
  }
}
