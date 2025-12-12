import { type ValidationError, type ValidationErrorPath } from '../../../errors'
import { type ErrorSummaryList } from '../../../types/ui/gds/error-summary'
import { type ValidationErrorsViewModel } from './validation-errors.view-model'

type ErrorMessageByPath = Map<string, string>

export class ValidationErrorsPresenter {
  constructor(
    private readonly validationError: ValidationError,
    private readonly fieldOrder: string[] = [],
  ) {}

  present(): ValidationErrorsViewModel {
    const errorMessageByPath = this.groupErrorsByPath()

    const errorSummaryList = this.buildErrorSummaryList(errorMessageByPath)
    const fieldErrors = this.buildFieldErrors(errorMessageByPath)

    return {
      errorSummaryList,
      fields: fieldErrors,
    }
  }

  private static pathToFieldName(path: ValidationErrorPath): string {
    const [firstItem, ...restItems] = path
    const restItemsString = restItems.map(item => `[${item}]`)

    return `${firstItem}${restItemsString}`
  }

  private groupErrorsByPath(): ErrorMessageByPath {
    const { errors } = this.validationError
    const errorMessageByPath = new Map<string, string>()

    for (const { path, message } of errors) {
      const key = ValidationErrorsPresenter.pathToFieldName(path)

      if (!errorMessageByPath.has(key)) {
        errorMessageByPath.set(key, message)
      }
    }

    return errorMessageByPath
  }

  private buildErrorSummaryList(errorMessageByPath: ErrorMessageByPath): ErrorSummaryList {
    const fieldOrderSet = new Set(this.fieldOrder)

    const orderedErrors = this.fieldOrder
      .filter(path => errorMessageByPath.has(path))
      .map(path => ({
        text: errorMessageByPath.get(path),
        href: `#${path}`,
      }))

    const unorderedErrors: ErrorSummaryList = Array.from(errorMessageByPath.entries()).reduce<ErrorSummaryList>(
      (accumulator, [path, message]) => {
        if (!fieldOrderSet.has(path)) {
          accumulator.push({ text: message, href: `#${path}` })
        }

        return accumulator
      },
      [],
    )

    return [...orderedErrors, ...unorderedErrors]
  }

  private buildFieldErrors(errorMessageByPath: ErrorMessageByPath): ValidationErrorsViewModel['fields'] {
    return errorMessageByPath.entries().reduce<ValidationErrorsViewModel['fields']>((accumulator, [field, message]) => {
      return {
        ...accumulator,
        [field]: {
          text: message,
        },
      }
    }, {})
  }
}
