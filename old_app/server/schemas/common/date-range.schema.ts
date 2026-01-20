import z from 'zod'

export const dateRangeSchema = z.object({
  from: z.string().trim().optional(),
  to: z.string().trim().optional(),
})
