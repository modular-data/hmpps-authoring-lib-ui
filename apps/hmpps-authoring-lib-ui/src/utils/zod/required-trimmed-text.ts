import { z } from 'zod';

export const requiredTrimmedText = <TSchema extends z.ZodString>(
  schema: TSchema,
) => {
  return z.string().trim().min(1).pipe(schema);
};
