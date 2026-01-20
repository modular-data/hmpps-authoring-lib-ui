import { z } from 'zod'
import { createDataProductSchema } from './create-data-product.dto'

export const updateDataProductSchema = createDataProductSchema.extend({
  id: z.string(),
})

export type UpdateDataProductDto = z.infer<typeof updateDataProductSchema>
