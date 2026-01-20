import { z } from 'zod'
import { DataProductState } from '../../types/entities/data-product'
import { dateRangeSchema } from '../common/date-range.schema'

const qualityMetricRangeSchema = z.object({
  from: z.string().trim().optional(),
  to: z.string().trim().optional(),
})

export const dataProductsFilterFormSchema = z.object({
  filters: z
    .object({
      search: z.string().optional(),
      owner: z.string().optional(),
      version: z.string().optional(),
      accuracy: qualityMetricRangeSchema.optional(),
      consistency: qualityMetricRangeSchema.optional(),
      states: z.array(z.nativeEnum(DataProductState)).optional(),
      tags: z.array(z.string()).optional(),
      createdAt: dateRangeSchema.optional(),
      updatedAt: dateRangeSchema.optional(),
      lastPreviewedAt: dateRangeSchema.optional(),
    })
    .optional(),
})

export type DataProductsFilterFormValues = z.input<typeof dataProductsFilterFormSchema>
