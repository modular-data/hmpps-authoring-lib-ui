import { z } from 'zod';
import { DataProductState } from '../../types/entities/data-product';
import { dateRangeSchema } from '../common/date-range.schema';

export const dataProductsFilterFormSchema = z.object({
  filters: z
    .object({
      search: z.string().optional(),
      states: z.array(z.nativeEnum(DataProductState)).optional(),
      createdAt: dateRangeSchema.optional(),
      updatedAt: dateRangeSchema.optional(),
    })
    .optional(),
});

export type DataProductsFilterFormValues = z.input<
  typeof dataProductsFilterFormSchema
>;
