'use client';

import { type ComponentProps, useEffect } from 'react';
import {
  type DefaultValues,
  type FieldValues,
  type UseFormReturn,
  useForm,
} from 'react-hook-form';
import { type ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type DataProduct } from '@/generated/core-api';
import { useSyncRhfErrorSummary } from '@/components/page-error-summary';
import {
  mapValidationErrorsToForm,
  ROOT_SERVER_ERROR_PATH,
} from '@/utils/forms/map-validation-errors-to-form';
import { type DataProductBuilderActionResult } from '@/features/data-products/actions/shared';

interface UseDataProductBuilderStepProps<TValues extends FieldValues> {
  schema: ZodType<TValues, TValues>;
  defaultValues?: DefaultValues<TValues>;
  genericErrorMessage: string;
  submitAction: (values: TValues) => Promise<DataProductBuilderActionResult>;
  onSubmittingChange: (isSubmitting: boolean) => void;
  onSuccess: (dataProduct: DataProduct) => void;
}

interface UseDataProductBuilderStepResult<TValues extends FieldValues> {
  form: UseFormReturn<TValues>;
  formProps: ComponentProps<'form'>;
}

export const useDataProductBuilderStep = <TValues extends FieldValues>({
  schema,
  defaultValues,
  genericErrorMessage,
  submitAction,
  onSubmittingChange,
  onSuccess,
}: UseDataProductBuilderStepProps<TValues>): UseDataProductBuilderStepResult<TValues> => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    shouldFocusError: false,
    defaultValues,
  });

  const { formState, handleSubmit, setError } = form;
  const { isSubmitting } = formState;

  useSyncRhfErrorSummary(formState);

  const handleFormSubmit = async (values: TValues) => {
    try {
      const result = await submitAction(values);

      if (!result.ok) {
        mapValidationErrorsToForm(result.validationErrors, setError);
        return;
      }

      onSuccess(result.dataProduct);
    } catch {
      setError(ROOT_SERVER_ERROR_PATH, {
        type: 'server',
        message: genericErrorMessage,
      });
    }
  };

  useEffect(() => {
    onSubmittingChange(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  return {
    form,
    formProps: {
      noValidate: true,
      onSubmit: handleSubmit(handleFormSubmit),
    },
  };
};
