import { type FieldValues, type UseFormSetError } from 'react-hook-form';
import { type ValidationErrorItems } from '@/errors';

export const ROOT_SERVER_ERROR_PATH = 'root.serverError' as const;

const combineMessages = (messages: string[]) => {
  return messages.join('. ');
};

export const mapValidationErrorsToForm = <T extends FieldValues>(
  errors: ValidationErrorItems,
  setError: UseFormSetError<T>,
) => {
  const groupedErrors = new Map<string, string[]>();

  for (const { path, message } of errors) {
    const formErrorPath =
      path.length > 0 ? path.join('.') : ROOT_SERVER_ERROR_PATH;
    const messages = groupedErrors.get(formErrorPath);

    if (messages) {
      messages.push(message);
      continue;
    }

    groupedErrors.set(formErrorPath, [message]);
  }

  for (const [formErrorPath, messages] of groupedErrors) {
    setError(formErrorPath as Parameters<typeof setError>[0], {
      type: 'server',
      message: combineMessages(messages),
    });
  }
};
