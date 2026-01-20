import { z } from 'zod'
import { createDatasetSchema } from './create-dataset.dto'

export const updateDatasetSchema = createDatasetSchema.extend({
  id: z.string(),
})

export type UpdateDatasetDto = z.output<typeof updateDatasetSchema>
