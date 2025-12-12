import { z } from 'zod'
import { DatasetState } from '../../types/entities/dataset'
import { dateRangeSchema } from '../common/date-range.schema'

export const datasetsFilterFormSchema = z.object({
  filters: z
    .object({
      search: z.string().optional(),
      owner: z.string().optional(),
      version: z.string().optional(),
      states: z.array(z.nativeEnum(DatasetState)).optional(),
      tags: z.array(z.string()).optional(),
      createdAt: dateRangeSchema.optional(),
      updatedAt: dateRangeSchema.optional(),
      previewedAt: dateRangeSchema.optional(),
    })
    .optional(),
})

export type DatasetsFilterFormValues = z.input<typeof datasetsFilterFormSchema>
