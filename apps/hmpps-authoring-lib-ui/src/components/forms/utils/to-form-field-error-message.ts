import { type FieldError } from 'react-hook-form';

export interface FormFieldErrorMessage {
  children: string;
}

export const toFormFieldErrorMessage = (
  error?: FieldError,
): FormFieldErrorMessage | undefined => {
  const { message = '' } = error ?? {};
  if (typeof message !== 'string' || message.length === 0) {
    return undefined;
  }

  return { children: message };
};
