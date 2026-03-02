import { z } from 'zod';

export const createDataProductSchema = z.object({}); // TODO: MOJ-455 | Implement Data Product create schema

export type CreateDataProductDto = z.output<typeof createDataProductSchema>;
