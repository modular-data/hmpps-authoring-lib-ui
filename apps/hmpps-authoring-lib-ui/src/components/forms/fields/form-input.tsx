'use client';

import { type FieldValues } from 'react-hook-form';
import { type InputProps, Input } from '@modular-data/gds-components';
import { useFormFieldErrorMessage } from '../hooks/use-form-field-error-message';
import { type RegisteredFormFieldProps } from '../types';

export type FormInputProps<TFormValues extends FieldValues> =
  RegisteredFormFieldProps<TFormValues, InputProps>;

export const FormInput = <TFormValues extends FieldValues>({
  name,
  control,
  ...inputProps
}: FormInputProps<TFormValues>) => {
  const registration = control.register(name);
  const errorMessage = useFormFieldErrorMessage({ name, control });

  return (
    <Input {...inputProps} {...registration} errorMessage={errorMessage} />
  );
};
