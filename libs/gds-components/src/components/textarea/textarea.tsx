import classNames from 'classnames';
import { FormGroup } from '../form-group';
import { Label } from '../label';
import { Hint } from '../hint';
import { ErrorMessage } from '../error-message';
import { buildAriaDescribedBy } from '../../utils/build-aria-described-by';
import { type TextareaProps } from './textarea.types';

export const Textarea = ({
  className,
  id,
  name,
  label,
  hint,
  errorMessage,
  formGroup,
  describedBy,
  rows = 5,
  ref,
  ...restTextareaProps
}: TextareaProps) => {
  const { beforeInput, afterInput, ...restFormGroupProps } = formGroup || {};

  const resolvedId = id ?? name;
  const hintId = hint && `${resolvedId}-hint`;
  const errorId = errorMessage && `${resolvedId}-error`;
  const ariaDescribedBy = buildAriaDescribedBy(describedBy, hintId, errorId);
  const withError = !!errorMessage;

  const combinedClassName = classNames(
    'govuk-textarea',
    {
      'govuk-textarea--error': withError,
    },
    className,
  );

  return (
    <FormGroup {...restFormGroupProps} withError={withError}>
      <Label {...label} htmlFor={resolvedId} />

      {hint && <Hint {...hint} id={hintId} />}

      {errorMessage && <ErrorMessage {...errorMessage} id={errorId} />}

      {beforeInput}

      <textarea
        ref={ref}
        className={combinedClassName}
        id={resolvedId}
        name={name}
        rows={rows}
        aria-describedby={ariaDescribedBy}
        {...restTextareaProps}
      />

      {afterInput}
    </FormGroup>
  );
};
