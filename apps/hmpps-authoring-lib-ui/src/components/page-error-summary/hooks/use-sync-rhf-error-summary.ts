'use client';

import { useEffect } from 'react';
import { type FieldValues, type FormState } from 'react-hook-form';
import { rhfToErrorSummaryItems } from '@/components/page-error-summary/helpers/rhf-to-error-summary-items';
import { usePageErrorSummary } from './use-page-error-summary';

export const useSyncRhfErrorSummary = <TFieldValues extends FieldValues>(
  formState: FormState<TFieldValues>,
) => {
  const { setItems } = usePageErrorSummary();

  const isSubmittedOnce = formState.submitCount > 0;

  useEffect(() => {
    setItems(isSubmittedOnce ? rhfToErrorSummaryItems(formState.errors) : []);
  }, [formState, isSubmittedOnce, setItems]);
};
