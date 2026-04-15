'use server';

import { ValidationError } from '@/errors';
import { type DataProductCreateInput } from '@/generated/core-api';
import { zDataProductCreateInput } from '@/generated/core-api/zod.gen';
import { getServices } from '@/server/services-registry';
import {
  type DataProductBuilderActionResult,
  getFreshDataProduct,
  handleDataProductBuilderActionError,
} from './shared';

export const createDataProduct = async (
  data: DataProductCreateInput,
): Promise<DataProductBuilderActionResult> => {
  try {
    const parseResult = zDataProductCreateInput.safeParse(data);

    if (!parseResult.success) {
      throw ValidationError.fromZod(parseResult.error);
    }

    const { dataProductService } = getServices();

    const createdDataProductOverview = await dataProductService.create(
      parseResult.data,
    );

    return {
      ok: true,
      dataProduct: await getFreshDataProduct(createdDataProductOverview.id),
    };
  } catch (error) {
    return handleDataProductBuilderActionError(error);
  }
};
