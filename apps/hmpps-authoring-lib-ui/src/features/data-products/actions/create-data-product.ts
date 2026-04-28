'use server';

import { ValidationError } from '@/errors';
import { getServices } from '@/server/services-registry';
import {
  overviewStepSchema,
  type OverviewStepValues,
} from '@/features/data-products/schemas/overview-step.schema';
import {
  type DataProductBuilderActionResult,
  handleDataProductBuilderActionError,
} from './shared';

export const createDataProduct = async (
  data: OverviewStepValues,
): Promise<DataProductBuilderActionResult> => {
  try {
    const parseResult = overviewStepSchema.safeParse(data);

    if (!parseResult.success) {
      throw ValidationError.fromZod(parseResult.error);
    }

    const { dataProductService } = getServices();

    const createdDataProductOverview = await dataProductService.create(
      parseResult.data,
    );

    return {
      ok: true,
      dataProduct: await dataProductService.getById(
        createdDataProductOverview.id,
      ),
    };
  } catch (error) {
    return handleDataProductBuilderActionError(error);
  }
};
