import { type Environment as NunjucksEnvironment } from 'nunjucks'
import {
  type DataProduct,
  type DataProductsFiltersMetadata,
  type PaginatedDataProducts,
} from '../../../types/entities/data-product'
import { type ColumnDefinitions } from '../../../types/ui/table/column-definitions'
import { type GdsTable } from '../../../types/ui/gds/table'
import { createDataProductTableColumns } from './create-data-product-table-columns'
import { buildGdsTable } from '../../../utils/ui/table/build-gds-table'
import { type GdsCheckboxesItems } from '../../../types/ui/gds/checkboxes'
import { type MojSelectedFiltersCategories } from '../../../types/ui/moj/filter'
import { type DataProductsFilterFormValues } from '../../../schemas/data-product/data-products-filter-form.schema'
import { MojSelectedFiltersBuilder } from '../../../utils/ui/moj/filter/moj-selected-filters-builder'
import { type MojPaginationArgs } from '../../../types/ui/moj/pagination'
import { createMojPaginationArgs } from '../../../utils/ui/moj/pagination/create-moj-paginated-args'
import { type GetDataProductsQuery } from '../../../schemas/data-product/dto/get-data-products-query.dto'
import { mergeQueryParams } from '../../../utils/queryParams'
import { createHiddenInputFields, type HiddenInputFields } from '../../../utils/ui/hidden-input-fields'
import { toCheckboxItems } from '../../../utils/nunjucksSetup/filters/toCheckboxItems'
import { dataProductStateLabelMap } from '../../../constants/data-products'
import { toRecordBy } from '../../../utils/to-record-by'
import { type RouteDefinitions } from '../../../utils/route-definitions'

// TODO: MOJ-336 | Implement view-model types for this presenter

type DataProductColumns = ColumnDefinitions<DataProduct>

export class DataProductsPagePresenter {
  private allTableColumns: DataProductColumns = []

  constructor(
    private paginatedDataProducts: PaginatedDataProducts,
    private filtersMetadata: DataProductsFiltersMetadata,
    private reqQuery: GetDataProductsQuery,
    private nunjucksEnvironment: NunjucksEnvironment,
    private routeDefinitions: RouteDefinitions,
  ) {
    this.allTableColumns = createDataProductTableColumns(nunjucksEnvironment, routeDefinitions)
  }

  get hasUserQuery(): boolean {
    return !!Object.keys(this.reqQuery).length
  }

  get filterOptions() {
    const { states, tags } = this.filtersMetadata

    const stateCheckboxItems = states.map(state => ({
      value: state,
      text: dataProductStateLabelMap[state],
    }))

    const tagCheckboxItems = toCheckboxItems(tags)

    return {
      states: stateCheckboxItems,
      tags: tagCheckboxItems,
    }
  }

  get filterValues(): DataProductsFilterFormValues['filters'] {
    return this.reqQuery?.filters
  }

  get selectedFiltersCategories(): MojSelectedFiltersCategories {
    const builder = new MojSelectedFiltersBuilder(this.routeDefinitions.dataProducts.createUrl(), this.reqQuery)

    const tagReferenceById = toRecordBy(this.filtersMetadata.tags, tag => tag.id)

    return builder
      .category('Search')
      .addText('search')
      .category('Owner')
      .addText('owner')
      .category('Version')
      .addText('version')
      .category('Quality metrics')
      .addRange('accuracy', 'Accuracy')
      .addRange('consistency', 'Consistency')
      .category('States')
      .addSelections('states', {
        getText: state => dataProductStateLabelMap[state],
      })
      .category('Tags')
      .addSelections('tags', {
        getText: tagId => tagReferenceById[tagId]?.name,
      })
      .category('Dates')
      .addRange('createdAt', 'Created')
      .addRange('updatedAt', 'Updated')
      .addRange('lastPreviewedAt', 'Previewed')
      .build()
  }

  get clearFiltersHref(): string {
    const mergedQueryParams = mergeQueryParams(this.reqQuery, { filters: undefined, page: undefined })

    return this.routeDefinitions.dataProducts.createUrl(mergedQueryParams)
  }

  get filterHiddenInputFields(): HiddenInputFields {
    const { columns, columnPickerApplied } = this.reqQuery || {}

    return createHiddenInputFields({
      columns,
      columnPickerApplied,
    })
  }

  get columnPickerItems(): GdsCheckboxesItems {
    return this.allTableColumns.map(({ key, header, enableHiding }) => ({
      value: key,
      text: header,
      disabled: !enableHiding,
    }))
  }

  get columnPickerValues(): string[] {
    const { columns: selectedColumnKeys = [], columnPickerApplied } = this.reqQuery

    return this.allTableColumns
      .filter(column => {
        if (!columnPickerApplied || !column.enableHiding) {
          return true
        }

        return selectedColumnKeys.includes(column.key)
      })
      .map(column => column.key)
  }

  get columnPickerResetHref(): string {
    const mergedQueryParams = mergeQueryParams(this.reqQuery, { columns: undefined, columnPickerApplied: undefined })

    return this.routeDefinitions.dataProducts.createUrl(mergedQueryParams)
  }

  get columnPickerHiddenInputFields(): HiddenInputFields {
    const mergedQueryParams = mergeQueryParams(this.reqQuery, { columns: undefined, columnPickerApplied: undefined })

    return createHiddenInputFields(mergedQueryParams)
  }

  get visibleTableColumns(): DataProductColumns {
    const { columnPickerValues } = this

    return this.allTableColumns.filter(column => {
      return columnPickerValues.includes(column.key)
    })
  }

  get table(): GdsTable {
    return buildGdsTable(this.visibleTableColumns, this.paginatedDataProducts.content)
  }

  get pagination(): MojPaginationArgs | null {
    return createMojPaginationArgs(this.paginatedDataProducts, this.reqQuery)
  }

  present() {
    return {
      filterOptions: this.filterOptions,
      filterValues: this.filterValues,
      selectedFiltersCategories: this.selectedFiltersCategories,
      clearFiltersHref: this.clearFiltersHref,
      filterHiddenInputFields: this.filterHiddenInputFields,
      columnPickerItems: this.columnPickerItems,
      columnPickerValues: this.columnPickerValues,
      columnPickerResetHref: this.columnPickerResetHref,
      columnPickerHiddenInputFields: this.columnPickerHiddenInputFields,
      table: this.table,
      pagination: this.pagination,
      hasUserQuery: this.hasUserQuery,
    }
  }
}
