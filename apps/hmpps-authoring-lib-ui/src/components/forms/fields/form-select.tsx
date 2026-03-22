'use client';

import { type FieldValues } from 'react-hook-form';
import { type SelectProps, Select } from '@modular-data/gds-components';
import { useFormFieldErrorMessage } from '../hooks/use-form-field-error-message';
import { type RegisteredFormFieldProps } from './types';

export type FormSelectProps<TFormValues extends FieldValues> =
  RegisteredFormFieldProps<TFormValues, SelectProps>;

export const FormSelect = <TFormValues extends FieldValues>({
  name,
  control,
  ...selectProps
}: FormSelectProps<TFormValues>) => {
  const registration = control.register(name);
  const errorMessage = useFormFieldErrorMessage({ name, control });

  return (
    <Select {...selectProps} {...registration} errorMessage={errorMessage} />
  );
};
