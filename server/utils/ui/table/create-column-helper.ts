import { type DeepKeyOf } from '../../../types/utils/deep-key-of'
import { type DeepValue } from '../../../types/utils/deep-value'
import { type ColumnDefinition, type CellContext } from '../../../types/ui/table/column-definitions'
import { type GdsTableCell, type GdsTableHeader } from '../../../types/ui/gds/table'
import { NO_DATA_PLACEHOLDER } from '../../../constants/common'

type CreateAccessorColumnOptions<TData, TValue> = Omit<
  ColumnDefinition<TData, TValue>,
  'key' | 'toGdsTableHeader' | 'toGdsTableCell'
> &
  Partial<Pick<ColumnDefinition<TData, TValue>, 'toGdsTableHeader' | 'toGdsTableCell'>>

export const createColumnHelper = <TData = unknown>() => {
  const accessor = <TKey extends DeepKeyOf<TData>, TValue extends DeepValue<TData, TKey> = DeepValue<TData, TKey>>(
    key: TKey,
    options: CreateAccessorColumnOptions<TData, TValue>,
  ): ColumnDefinition<TData, TValue> => {
    const { header, sortable, ...restOptions } = options

    const toGdsTableHeader = (): GdsTableHeader => {
      const attributes = sortable
        ? {
            'aria-sort': 'none',
            'data-sort-key': key,
          }
        : undefined

      return {
        text: header,
        attributes,
      }
    }

    const toGdsTableCell = ({ getValue }: CellContext<TData, TValue>): GdsTableCell => {
      const value = getValue()
      const stringifiedValue = value?.toString() || ''

      return {
        text: stringifiedValue.trim() || NO_DATA_PLACEHOLDER,
      }
    }

    return {
      key,
      header,
      sortable,
      enableHiding: true,
      toGdsTableHeader,
      toGdsTableCell,
      ...restOptions,
    }
  }

  return {
    accessor,
  }
}
