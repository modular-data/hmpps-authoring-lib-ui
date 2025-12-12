import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.string().optional(),
  size: z.string().optional(),
})
