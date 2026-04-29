'use server';

import { refresh } from 'next/cache';
import { ValidationError } from '@/errors';
import { getServices } from '@/server/services-registry';
import {
  dataSourcesStepSchema,
  type DataSourcesStepValues,
} from '@/features/data-products/schemas/data-sources-step.schema';
import {
  type DataProductBuilderActionResult,
  handleDataProductBuilderActionError,
} from './shared';

export const saveDataProductDataSources = async (
  id: string,
  data: DataSourcesStepValues,
): Promise<DataProductBuilderActionResult> => {
  try {
    const parseResult = dataSourcesStepSchema.safeParse(data);

    if (!parseResult.success) {
      throw ValidationError.fromZod(parseResult.error);
    }

    const { dataProductService } = getServices();

    await dataProductService.saveDataSources(id, parseResult.data);

    refresh();

    return {
      ok: true,
      dataProduct: await dataProductService.getById(id),
    };
  } catch (error) {
    return handleDataProductBuilderActionError(error);
  }
};
