import { z } from 'zod';

// TODO: Double-check usage of this schema. If not used, remove it.

export const paginationSchema = z.object({
  page: z.string().optional(),
  size: z.string().optional(),
});
