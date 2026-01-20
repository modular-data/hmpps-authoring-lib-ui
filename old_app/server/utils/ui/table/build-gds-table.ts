import {
  type GdsTable,
  type GdsTableCell,
  type GdsTableHead,
  type GdsTableRow,
  type GdsTableRows,
} from '../../../types/ui/gds/table'
import {
  type ColumnDefinition,
  type ColumnDefinitions,
  type CellContext,
} from '../../../types/ui/table/column-definitions'
import { type DeepValue } from '../../../types/utils/deep-value'
import { deepGet } from '../../deepGet'

const buildGdsTableHead = <TData>(columns: ColumnDefinitions<TData>): GdsTableHead => {
  return columns.map(column => {
    return column.toGdsTableHeader()
  })
}

const buildGdsTableCell = <TData>(column: ColumnDefinition<TData>, rowData: TData): GdsTableCell => {
  const cellContext: CellContext<TData, DeepValue<TData, typeof column.key>> = {
    column,
    rowData,
    getValue: () => deepGet(rowData, column.key),
  }

  return column.toGdsTableCell(cellContext)
}

const buildGdsTableRow = <TData>(columns: ColumnDefinitions<TData>, rowData: TData): GdsTableRow => {
  return columns.map(column => {
    return buildGdsTableCell(column, rowData)
  })
}

const buildGdsTableRows = <TData>(columns: ColumnDefinitions<TData>, data: TData[]): GdsTableRows => {
  return data.map(rowData => {
    return buildGdsTableRow(columns, rowData)
  })
}

export const buildGdsTable = <TData>(columns: ColumnDefinitions<TData>, data: TData[]): GdsTable => {
  const head = buildGdsTableHead(columns)
  const rows = buildGdsTableRows(columns, data)

  return {
    head,
    rows,
  }
}
