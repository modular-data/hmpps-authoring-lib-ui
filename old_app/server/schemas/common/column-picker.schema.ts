import { z } from 'zod'

export const columnPickerSchema = z.object({
  columns: z.array(z.string()).optional(),
  columnPickerApplied: z.literal(true).optional(),
})
