import { type DataProduct } from '@/generated/core-api';
import { ValidationError, type ValidationErrorItems } from '@/errors';
import { getServices } from '@/server/services-registry';

export type DataProductBuilderActionSuccessResult = {
  ok: true;
  dataProduct: DataProduct;
};

export type DataProductBuilderActionErrorResult = {
  ok: false;
  validationErrors: ValidationErrorItems;
};

export type DataProductBuilderActionResult =
  | DataProductBuilderActionSuccessResult
  | DataProductBuilderActionErrorResult;

export const handleDataProductBuilderActionError = (
  error: unknown,
): DataProductBuilderActionErrorResult => {
  if (ValidationError.isValidationError(error)) {
    return {
      ok: false,
      validationErrors: error.errors,
    };
  }

  throw error;
};

export const getFreshDataProduct = async (id: string): Promise<DataProduct> => {
  const { dataProductService } = getServices();

  return dataProductService.getById(id);
};
