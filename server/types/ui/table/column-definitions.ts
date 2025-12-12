import { type DeepKeyOf } from '../../utils/deep-key-of'
import { type GdsTableCell, type GdsTableHeader } from '../gds/table'

export interface CellContext<TData, TValue> {
  column: ColumnDefinition<TData, TValue>
  rowData: TData
  getValue: () => TValue
}

export interface ColumnDefinition<TData, TValue = unknown> {
  key: DeepKeyOf<TData>
  header: string
  sortable?: boolean
  enableHiding?: boolean
  toGdsTableHeader: () => GdsTableHeader
  toGdsTableCell: (context: CellContext<TData, TValue>) => GdsTableCell
}

export type ColumnDefinitions<TData> = ColumnDefinition<TData>[]
