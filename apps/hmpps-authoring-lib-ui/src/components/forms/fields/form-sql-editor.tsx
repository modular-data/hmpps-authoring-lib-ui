'use client';

// TODO: Make label clicks focus the CodeMirror editor once higher-priority work is done.

import {
  type FieldPathByValue,
  type FieldValues,
  useController,
} from 'react-hook-form';
import { type ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import {
  type LabelProps,
  type HintProps,
  FormGroup,
  Label,
  Hint,
  ErrorMessage,
} from '@modular-data/gds-components';
import { buildAriaDescribedBy } from '@modular-data/gds-components/utils/build-aria-described-by';
import { SQLEditor, type SQLEditorConfig } from '@/components/sql-editor';
import { type FormFieldControlProps } from '@/components/forms/types';
import { toFormFieldErrorMessage } from '@/components/forms/utils/to-form-field-error-message';

export type FormSQLEditorProps<TFormValues extends FieldValues> = Omit<
  ReactCodeMirrorProps,
  'value'
> &
  FormFieldControlProps<TFormValues, FieldPathByValue<TFormValues, string>> & {
    id?: string;
    label: Omit<LabelProps, 'htmlFor'>;
    hint?: Omit<HintProps, 'id'>;
    config?: SQLEditorConfig;
  };

export const FormSQLEditor = <TFormValues extends FieldValues>({
  name,
  control,
  id,
  label,
  hint,
  config,
  extensions = [],
  onChange,
  onBlur,
  ...editorProps
}: FormSQLEditorProps<TFormValues>) => {
  const { field, fieldState } = useController({ name, control });
  const errorMessage = toFormFieldErrorMessage(fieldState.error);

  const resolvedId = id ?? name;
  const labelId = `${resolvedId}-label`;
  const hintId = hint && `${resolvedId}-hint`;
  const errorId = errorMessage && `${resolvedId}-error`;
  const describedBy = buildAriaDescribedBy(hintId, errorId);

  return (
    <FormGroup withError={!!errorMessage}>
      <Label {...label} id={labelId} />
      {hint && <Hint {...hint} id={hintId} />}
      {errorMessage && <ErrorMessage {...errorMessage} id={errorId} />}
      <SQLEditor
        {...editorProps}
        hasError={!!errorMessage}
        config={config}
        extensions={[
          EditorView.contentAttributes.of({
            id: resolvedId,
            'aria-labelledby': labelId,
            ...(describedBy && { 'aria-describedby': describedBy }),
            ...(errorMessage && { 'aria-invalid': 'true' }),
          }),
          ...extensions,
        ]}
        value={field.value ?? ''}
        onChange={(value, viewUpdate) => {
          field.onChange(value);
          onChange?.(value, viewUpdate);
        }}
        onBlur={(event) => {
          field.onBlur();
          onBlur?.(event);
        }}
      />
    </FormGroup>
  );
};
