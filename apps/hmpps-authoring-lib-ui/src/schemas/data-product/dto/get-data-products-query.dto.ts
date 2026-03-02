import { type z } from 'zod';
import { dataProductsFilterFormSchema } from '../data-products-filter-form.schema';
import { sortSchema } from '../../common/sort.schema';
import { paginationSchema } from '../../common/pagination.schema';
import { columnPickerSchema } from '../../common/column-picker.schema';

// TODO: Complete Data Product get query schema

export const getDataProductsQuerySchema = dataProductsFilterFormSchema
  .merge(sortSchema)
  .merge(paginationSchema)
  .merge(columnPickerSchema);

export type GetDataProductsQuery = z.input<typeof getDataProductsQuerySchema>;

export type GetDataProductsQueryDto = z.output<
  typeof getDataProductsQuerySchema
>;
