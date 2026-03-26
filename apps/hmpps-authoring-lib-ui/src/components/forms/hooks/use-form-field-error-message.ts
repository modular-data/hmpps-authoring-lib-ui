'use client';

import { type FieldValues, type Path, useFormState } from 'react-hook-form';
import { type FormFieldControlProps } from '../types';
import { toFormFieldErrorMessage } from '../utils/to-form-field-error-message';

export const useFormFieldErrorMessage = <
  TFormValues extends FieldValues,
  TName extends Path<TFormValues> = Path<TFormValues>,
>({
  name,
  control,
}: FormFieldControlProps<TFormValues, TName>) => {
  const formState = useFormState({ name, control, exact: true });
  const { error } = control.getFieldState(name, formState);

  return toFormFieldErrorMessage(error);
};
