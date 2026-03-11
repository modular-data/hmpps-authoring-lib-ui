import { z } from 'zod';

// TODO: Double-check usage of this schema. If not used, remove it.

export const columnPickerSchema = z.object({
  columns: z.array(z.string()).optional(),
  columnPickerApplied: z.literal(true).optional(),
});
