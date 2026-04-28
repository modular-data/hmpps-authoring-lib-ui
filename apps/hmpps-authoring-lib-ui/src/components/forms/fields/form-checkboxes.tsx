'use client';

import {
  type CheckboxesProps,
  type CheckboxesValues,
  Checkboxes,
} from '@modular-data/gds-components';
import {
  type FieldPathByValue,
  type FieldValues,
  useController,
} from 'react-hook-form';
import { toFormFieldErrorMessage } from '@/components/forms/utils/to-form-field-error-message';
import { type FormFieldControlProps } from '@/components/forms/types';

type ControllerManagedPropKeys =
  | 'name'
  | 'values'
  | 'errorMessage'
  | 'onValuesChange';

export type FormCheckboxesProps<TFormValues extends FieldValues> = Omit<
  CheckboxesProps,
  ControllerManagedPropKeys
> &
  FormFieldControlProps<
    TFormValues,
    FieldPathByValue<TFormValues, CheckboxesValues>
  >;

export const FormCheckboxes = <TFormValues extends FieldValues>({
  name,
  control,
  onBlur,
  ...checkboxesProps
}: FormCheckboxesProps<TFormValues>) => {
  const { field, fieldState } = useController({ name, control });
  const errorMessage = toFormFieldErrorMessage(fieldState.error);

  return (
    <Checkboxes
      {...checkboxesProps}
      name={name}
      values={field.value ?? []}
      errorMessage={errorMessage}
      onBlur={(event) => {
        const nextFocused = event.relatedTarget;
        const isFocusedOutside = !event.currentTarget.contains(nextFocused);

        if (isFocusedOutside) {
          field.onBlur();
          onBlur?.(event);
        }
      }}
      onValuesChange={(nextValues) => {
        field.onChange(nextValues);
      }}
    />
  );
};
