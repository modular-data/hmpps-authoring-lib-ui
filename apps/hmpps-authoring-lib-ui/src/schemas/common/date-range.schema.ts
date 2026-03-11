import z from 'zod';

// TODO: Double-check usage of this schema. If not used, remove it.

export const dateRangeSchema = z.object({
  from: z.string().trim().optional(),
  to: z.string().trim().optional(),
});
