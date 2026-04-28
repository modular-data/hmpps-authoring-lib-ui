'use server';

import { refresh } from 'next/cache';
import { ValidationError } from '@/errors';
import { getServices } from '@/server/services-registry';
import { type DataProductUpdateInput } from '@/generated/core-api';
import { overviewStepSchema } from '@/features/data-products/schemas/overview-step.schema';
import {
  type DataProductBuilderActionResult,
  handleDataProductBuilderActionError,
} from './shared';

export const saveDataProductOverview = async (
  id: string,
  data: DataProductUpdateInput,
): Promise<DataProductBuilderActionResult> => {
  try {
    const parseResult = overviewStepSchema.safeParse(data);

    if (!parseResult.success) {
      throw ValidationError.fromZod(parseResult.error);
    }

    const { dataProductService } = getServices();

    await dataProductService.saveOverview(id, parseResult.data);
    refresh();

    return {
      ok: true,
      dataProduct: await dataProductService.getById(id),
    };
  } catch (error) {
    return handleDataProductBuilderActionError(error);
  }
};
