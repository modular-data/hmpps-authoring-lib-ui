'use server';

import { refresh } from 'next/cache';
import { ValidationError } from '@/errors';
import { type DataProductUpdateInput } from '@/generated/core-api';
import { zDataProductUpdateInput } from '@/generated/core-api/zod.gen';
import { getServices } from '@/server/services-registry';
import {
  type DataProductBuilderActionResult,
  getFreshDataProduct,
  handleDataProductBuilderActionError,
} from './shared';

export const saveDataProductOverview = async (
  id: string,
  data: DataProductUpdateInput,
): Promise<DataProductBuilderActionResult> => {
  try {
    const parseResult = zDataProductUpdateInput.safeParse(data);

    if (!parseResult.success) {
      throw ValidationError.fromZod(parseResult.error);
    }

    const { dataProductService } = getServices();

    await dataProductService.saveOverview(id, parseResult.data);

    refresh();

    return {
      ok: true,
      dataProduct: await getFreshDataProduct(id),
    };
  } catch (error) {
    return handleDataProductBuilderActionError(error);
  }
};
