import { type ChangeEvent, type ComponentProps, type ReactNode } from 'react';
import { type FormGroupProps } from '../form-group';
import { type FieldsetProps } from '../fieldset';
import { type HintProps } from '../hint';
import { type ErrorMessageProps } from '../error-message';
import { type LabelProps } from '../label';

type NativeInputProps = ComponentProps<'input'>;

export type CheckboxValue = string;

export type CheckboxesValues = CheckboxValue[];

export type CheckboxesItemBehaviour = 'exclusive';

export interface CheckboxesFormGroupProps
  extends Omit<FormGroupProps, 'children' | 'withError'> {
  beforeInputs?: ReactNode;
  afterInputs?: ReactNode;
}

export interface CheckboxesHintProps
  extends Omit<HintProps, 'children' | 'id'> {
  children: ReactNode;
}

export interface CheckboxesErrorMessageProps
  extends Omit<ErrorMessageProps, 'children' | 'id'> {
  children: ReactNode;
}

export type CheckboxesItemLabelProps = Omit<
  LabelProps,
  'children' | 'htmlFor' | 'isPageHeading'
>;

export interface CheckboxesCheckboxItem
  extends Omit<
    NativeInputProps,
    'type' | 'defaultChecked' | 'aria-describedby' | 'children' | 'onChange'
  > {
  key?: string;
  value: CheckboxValue;
  label?: CheckboxesItemLabelProps;
  hint?: CheckboxesHintProps;
  conditional?: ReactNode;
  behaviour?: CheckboxesItemBehaviour;
  children: ReactNode;
}

export interface CheckboxesDividerItem {
  key?: string;
  divider: ReactNode;
}

export type CheckboxesItem = CheckboxesCheckboxItem | CheckboxesDividerItem;

export interface CheckboxesChangeMeta {
  name: string;
  value: CheckboxValue;
  checked: boolean;
  behaviour?: CheckboxesItemBehaviour;
  event: ChangeEvent<HTMLInputElement>;
}

export type CheckboxesOnValuesChange = (
  nextValues: CheckboxesValues,
  meta: CheckboxesChangeMeta,
) => void;

export interface CheckboxesProps
  extends Omit<ComponentProps<'div'>, 'children'> {
  name: string;
  idPrefix?: string;
  values?: CheckboxesValues;
  items: CheckboxesItem[];
  describedBy?: string;
  formGroup?: CheckboxesFormGroupProps;
  fieldset?: Omit<FieldsetProps, 'children'>;
  hint?: CheckboxesHintProps;
  errorMessage?: CheckboxesErrorMessageProps;
  onValuesChange?: CheckboxesOnValuesChange;
}
