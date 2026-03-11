import { z } from 'zod';

// TODO: Double-check usage of this schema. If not used, remove it.

export const sortSchema = z.object({
  sort: z.string().optional(),
});
