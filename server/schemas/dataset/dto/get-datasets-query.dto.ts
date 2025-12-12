import { z } from 'zod'
import { datasetsFilterFormSchema } from '../datasets-filter-form.schema'
import { sortSchema } from '../../common/sort.schema'
import { paginationSchema } from '../../common/pagination.schema'
import { columnPickerSchema } from '../../common/column-picker.schema'

export const getDatasetsQuerySchema = datasetsFilterFormSchema
  .merge(sortSchema)
  .merge(paginationSchema)
  .merge(columnPickerSchema)
  .extend({ bookmarked: z.literal(true).optional() })

export type GetDatasetsQuery = z.input<typeof getDatasetsQuerySchema>

export type GetDatasetsQueryDto = z.output<typeof getDatasetsQuerySchema>
