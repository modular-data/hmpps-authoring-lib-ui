import { z } from 'zod'

export const sortSchema = z.object({
  sort: z.string().optional(),
})
