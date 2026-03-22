import { type Control, type FieldValues, type Path } from 'react-hook-form';

export interface FormFieldControlProps<
  TFormValues extends FieldValues,
  TName extends Path<TFormValues> = Path<TFormValues>,
> {
  name: TName;
  control: Control<TFormValues>;
}

type RegisterManagedPropKeys =
  | 'ref'
  | 'name'
  | 'value'
  | 'defaultValue'
  | 'errorMessage'
  | 'onBlur'
  | 'onChange';

export type RegisteredFormFieldProps<
  TFormValues extends FieldValues,
  TComponentProps,
  TName extends Path<TFormValues> = Path<TFormValues>,
> = Omit<TComponentProps, RegisterManagedPropKeys> &
  FormFieldControlProps<TFormValues, TName>;
