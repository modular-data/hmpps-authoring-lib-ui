import { type ComponentProps, type ReactNode } from 'react';
import { type FormGroupProps } from '../form-group';
import { type LabelProps } from '../label';
import { type HintProps } from '../hint';
import { type ErrorMessageProps } from '../error-message';

interface TextareaFormGroupProps
  extends Omit<FormGroupProps, 'children' | 'withError'> {
  beforeInput?: ReactNode;
  afterInput?: ReactNode;
}

type NativeTextareaProps = ComponentProps<'textarea'>;

interface TextareaLabelProps extends Omit<LabelProps, 'htmlFor'> {
  children: ReactNode;
}

interface TextareaHintProps extends Omit<HintProps, 'id'> {
  children: ReactNode;
}

interface TextareaErrorMessageProps extends Omit<ErrorMessageProps, 'id'> {
  children: ReactNode;
}

export interface TextareaProps
  extends Omit<NativeTextareaProps, 'children' | 'aria-describedby'> {
  name: string;
  formGroup?: TextareaFormGroupProps;
  label: TextareaLabelProps;
  hint?: TextareaHintProps;
  errorMessage?: TextareaErrorMessageProps;
  describedBy?: string;
}
