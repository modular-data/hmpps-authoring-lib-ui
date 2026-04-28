'use client';

import { type FieldValues } from 'react-hook-form';
import { type TextareaProps, Textarea } from '@modular-data/gds-components';
import { useFormFieldErrorMessage } from '@/components/forms/hooks/use-form-field-error-message';
import { type RegisteredFormFieldProps } from '@/components/forms/types';

export type FormTextareaProps<TFormValues extends FieldValues> =
  RegisteredFormFieldProps<TFormValues, TextareaProps>;

export const FormTextarea = <TFormValues extends FieldValues>({
  name,
  control,
  ...textareaProps
}: FormTextareaProps<TFormValues>) => {
  const registration = control.register(name);
  const errorMessage = useFormFieldErrorMessage({ name, control });

  return (
    <Textarea
      {...textareaProps}
      {...registration}
      errorMessage={errorMessage}
    />
  );
};
