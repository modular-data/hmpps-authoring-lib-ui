import { type ZodError } from 'zod';

export type ValidationErrorPath = (string | number)[];

export interface ValidationErrorItem {
  path: ValidationErrorPath;
  message: string;
}

export type ValidationErrorItems = ValidationErrorItem[];

const VALIDATION_ERROR_TOKEN = Symbol.for('errors/ValidationError');

export class ValidationError extends Error {
  readonly [VALIDATION_ERROR_TOKEN] = true;

  private constructor(readonly errors: ValidationErrorItems) {
    super('Validation error happened!');

    this.name = 'ValidationError';
  }

  static fromApi(apiErrors: ValidationErrorItems): ValidationError {
    return new ValidationError(apiErrors);
  }

  static fromZod(zodError: ZodError): ValidationError {
    return new ValidationError(
      zodError.issues.map(({ path, message }) => ({
        path: path.map((segment) => {
          return typeof segment === 'number' ? segment : String(segment);
        }),
        message,
      })),
    );
  }

  static isValidationError(error: unknown): error is ValidationError {
    if (typeof error !== 'object' || error === null) {
      return false;
    }

    const candidate = error as Record<PropertyKey, unknown>;

    return candidate[VALIDATION_ERROR_TOKEN] === true;
  }
}
