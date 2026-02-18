import classNames from 'classnames';
import { FormGroup } from '../form-group';
import { Label } from '../label';
import { Hint } from '../hint';
import { ErrorMessage } from '../error-message';
import { buildAriaDescribedBy } from '../../utils/build-aria-described-by';
import { InputAffix } from './input-affix';
import { type InputProps } from './input.types';

export const Input = ({
  id,
  name,
  className,
  formGroup,
  label,
  hint,
  errorMessage,
  inputWrapper,
  prefix,
  suffix,
  width,
  extraLetterSpacing,
  describedBy,
  ref,
  ...restInputProps
}: InputProps) => {
  const { beforeInput, afterInput, ...restFormGroupProps } = formGroup || {};

  const resolvedId = id ?? name;
  const hintId = hint && `${resolvedId}-hint`;
  const errorId = errorMessage && `${resolvedId}-error`;
  const ariaDescribedBy = buildAriaDescribedBy(describedBy, hintId, errorId);
  const withError = !!errorMessage;
  const hasWrapperContent = !!(beforeInput || afterInput || prefix || suffix);

  const combinedClassName = classNames(
    'govuk-input',
    width,
    {
      'govuk-input--extra-letter-spacing': extraLetterSpacing,
      'govuk-input--error': withError,
    },
    className,
  );

  const inputElement = (
    <input
      ref={ref}
      className={combinedClassName}
      id={resolvedId}
      name={name}
      aria-describedby={ariaDescribedBy}
      {...restInputProps}
    />
  );

  const wrapperElement = hasWrapperContent && (
    <div
      {...inputWrapper}
      className={classNames('govuk-input__wrapper', inputWrapper?.className)}
    >
      {beforeInput}
      {prefix && <InputAffix {...prefix} type="prefix" />}
      {inputElement}
      {suffix && <InputAffix {...suffix} type="suffix" />}
      {afterInput}
    </div>
  );

  return (
    <FormGroup {...restFormGroupProps} withError={withError}>
      <Label htmlFor={resolvedId} {...label} />

      {hint && <Hint id={hintId} {...hint} />}

      {errorMessage && <ErrorMessage id={errorId} {...errorMessage} />}

      {wrapperElement || inputElement}
    </FormGroup>
  );
};
