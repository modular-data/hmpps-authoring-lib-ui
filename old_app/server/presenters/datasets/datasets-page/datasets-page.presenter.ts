import { type Environment as NunjucksEnvironment } from 'nunjucks'
import { type Dataset, type DatasetsFiltersMetadata, type PaginatedDatasets } from '../../../types/entities/dataset'
import { type ColumnDefinitions } from '../../../types/ui/table/column-definitions'
import { type GdsTable } from '../../../types/ui/gds/table'
import { createDatasetTableColumns } from './create-dataset-table-columns'
import { buildGdsTable } from '../../../utils/ui/table/build-gds-table'
import { type GdsCheckboxesItems } from '../../../types/ui/gds/checkboxes'
import { type MojSelectedFiltersCategories } from '../../../types/ui/moj/filter'
import { type DatasetsFilterFormValues } from '../../../schemas/dataset/datasets-filter-form.schema'
import { MojSelectedFiltersBuilder } from '../../../utils/ui/moj/filter/moj-selected-filters-builder'
import { type MojPaginationArgs } from '../../../types/ui/moj/pagination'
import { createMojPaginationArgs } from '../../../utils/ui/moj/pagination/create-moj-paginated-args'
import { type GetDatasetsQuery } from '../../../schemas/dataset/dto/get-datasets-query.dto'
import { mergeQueryParams } from '../../../utils/queryParams'
import { createHiddenInputFields, type HiddenInputFields } from '../../../utils/ui/hidden-input-fields'
import { toCheckboxItems } from '../../../utils/nunjucksSetup/filters/toCheckboxItems'
import { datasetStateLabelMap } from '../../../constants/datasets'
import { toRecordBy } from '../../../utils/to-record-by'
import { type RouteDefinitions } from '../../../utils/route-definitions'

type DatasetColumns = ColumnDefinitions<Dataset>

export class DatasetsPagePresenter {
  private allTableColumns: DatasetColumns = []

  constructor(
    private paginatedDatasets: PaginatedDatasets,
    private filtersMetadata: DatasetsFiltersMetadata,
    private reqQuery: GetDatasetsQuery,
    private nunjucksEnvironment: NunjucksEnvironment,
    private routeDefinitions: RouteDefinitions,
  ) {
    this.allTableColumns = createDatasetTableColumns(nunjucksEnvironment, routeDefinitions)
  }

  get hasUserQuery(): boolean {
    return !!Object.keys(this.reqQuery).length
  }

  get filterOptions() {
    const { states, tags } = this.filtersMetadata

    const stateCheckboxItems = states.map(state => ({
      value: state,
      text: datasetStateLabelMap[state],
    }))

    const tagCheckboxItems = toCheckboxItems(tags)

    return {
      states: stateCheckboxItems,
      tags: tagCheckboxItems,
    }
  }

  get filterValues(): DatasetsFilterFormValues['filters'] {
    return this.reqQuery?.filters
  }

  get selectedFiltersCategories(): MojSelectedFiltersCategories {
    const builder = new MojSelectedFiltersBuilder(this.routeDefinitions.datasets.createUrl(), this.reqQuery)

    const tagReferenceById = toRecordBy(this.filtersMetadata.tags, tag => tag.id)

    return builder
      .category('Search')
      .addText('search')
      .category('Owner')
      .addText('owner')
      .category('Version')
      .addText('version')
      .category('States')
      .addSelections('states', {
        getText: state => datasetStateLabelMap[state],
      })
      .category('Tags')
      .addSelections('tags', {
        getText: tagId => tagReferenceById[tagId]?.name,
      })
      .category('Dates')
      .addRange('createdAt', 'Created')
      .addRange('updatedAt', 'Modified')
      .addRange('previewedAt', 'Previewed')
      .build()
  }

  get clearFiltersHref(): string {
    const mergedQueryParams = mergeQueryParams(this.reqQuery, { filters: undefined, page: undefined })

    return this.routeDefinitions.datasets.createUrl(mergedQueryParams)
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

    return this.routeDefinitions.datasets.createUrl(mergedQueryParams)
  }

  get columnPickerHiddenInputFields(): HiddenInputFields {
    const mergedQueryParams = mergeQueryParams(this.reqQuery, { columns: undefined, columnPickerApplied: undefined })

    return createHiddenInputFields(mergedQueryParams)
  }

  get visibleTableColumns(): DatasetColumns {
    const { columnPickerValues } = this

    return this.allTableColumns.filter(column => {
      return columnPickerValues.includes(column.key)
    })
  }

  get table(): GdsTable {
    return buildGdsTable(this.visibleTableColumns, this.paginatedDatasets.content)
  }

  get pagination(): MojPaginationArgs | null {
    return createMojPaginationArgs(this.paginatedDatasets, this.reqQuery)
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
