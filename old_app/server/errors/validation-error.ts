export type ValidationErrorPath = (string | number)[]

type ValidationErrorItem = { path: ValidationErrorPath; message: string }

type ValidationErrorItems = ValidationErrorItem[]

export class ValidationError extends Error {
  private constructor(readonly errors: ValidationErrorItems) {
    super('Validation error happened!')

    this.name = 'ValidationError'
  }

  static fromApi(apiErrors: ValidationErrorItems): ValidationError {
    return new ValidationError(apiErrors)
  }
}
