import { type DataProduct } from '@/generated/core-api';
import { ValidationError, type ValidationErrorItems } from '@/errors';

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
