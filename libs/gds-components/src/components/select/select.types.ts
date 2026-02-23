import { type ComponentProps, type ReactNode } from 'react';
import { type FormGroupProps } from '../form-group';
import { type LabelProps } from '../label';
import { type HintProps } from '../hint';
import { type ErrorMessageProps } from '../error-message';

type NativeSelectProps = ComponentProps<'select'>;

type NativeOptionProps = ComponentProps<'option'>;

interface SelectFormGroupProps
  extends Omit<FormGroupProps, 'children' | 'withError'> {
  beforeInput?: ReactNode;
  afterInput?: ReactNode;
}

interface SelectLabelProps extends Omit<LabelProps, 'htmlFor'> {
  children: ReactNode;
}

interface SelectHintProps extends Omit<HintProps, 'id'> {
  children: ReactNode;
}

interface SelectErrorMessageProps extends Omit<ErrorMessageProps, 'id'> {
  children: ReactNode;
}

export interface SelectItem extends NativeOptionProps {
  children: ReactNode;
}

type SelectItems = SelectItem[];

export interface SelectProps
  extends Omit<NativeSelectProps, 'children' | 'aria-describedby'> {
  name: string;
  items: SelectItems;
  formGroup?: SelectFormGroupProps;
  label: SelectLabelProps;
  hint?: SelectHintProps;
  errorMessage?: SelectErrorMessageProps;
  describedBy?: string;
}
