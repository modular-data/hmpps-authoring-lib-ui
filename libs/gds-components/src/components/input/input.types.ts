import { type ComponentProps, type ReactNode } from 'react';
import { type FormGroupProps } from '../form-group';
import { type LabelProps } from '../label';
import { type HintProps } from '../hint';
import { type ErrorMessageProps } from '../error-message';
import { type InputAffixProps } from './input-affix';

export enum InputWidth {
  Fixed20 = 'govuk-input--width-20',
  Fixed10 = 'govuk-input--width-10',
  Fixed5 = 'govuk-input--width-5',
  Fixed4 = 'govuk-input--width-4',
  Fixed3 = 'govuk-input--width-3',
  Fixed2 = 'govuk-input--width-2',
  FluidFull = 'govuk-!-width-full',
  FluidThreeQuarters = 'govuk-!-width-three-quarters',
  FluidTwoThirds = 'govuk-!-width-two-thirds',
  FluidOneHalf = 'govuk-!-width-one-half',
  FluidOneThird = 'govuk-!-width-one-third',
  FluidOneQuarter = 'govuk-!-width-one-quarter',
}

type NativeInputProps = ComponentProps<'input'>;

interface InputFormGroupProps
  extends Omit<FormGroupProps, 'children' | 'withError'> {
  beforeInput?: ReactNode;
  afterInput?: ReactNode;
}

interface InputLabelProps extends Omit<LabelProps, 'htmlFor'> {
  children: ReactNode;
}

interface InputHintProps extends Omit<HintProps, 'id'> {
  children: ReactNode;
}

interface InputErrorMessageProps extends Omit<ErrorMessageProps, 'id'> {
  children: ReactNode;
}

type InputWrapperProps = Omit<ComponentProps<'div'>, 'children'>;

export interface InputProps
  extends Omit<NativeInputProps, 'children' | 'prefix' | 'aria-describedby'> {
  name: string;
  formGroup?: InputFormGroupProps;
  label: InputLabelProps;
  hint?: InputHintProps;
  errorMessage?: InputErrorMessageProps;
  inputWrapper?: InputWrapperProps;
  prefix?: Omit<InputAffixProps, 'type'>;
  suffix?: Omit<InputAffixProps, 'type'>;
  width?: InputWidth;
  extraLetterSpacing?: boolean;
  describedBy?: string;
}
