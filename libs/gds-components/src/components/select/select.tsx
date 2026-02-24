import classNames from 'classnames';
import { FormGroup } from '../form-group';
import { Label } from '../label';
import { Hint } from '../hint';
import { ErrorMessage } from '../error-message';
import { buildAriaDescribedBy } from '../../utils/build-aria-described-by';
import { type SelectProps } from './select.types';

export const Select = ({
  className,
  id,
  name,
  items,
  formGroup,
  label,
  hint,
  errorMessage,
  describedBy,
  ...restSelectProps
}: SelectProps) => {
  const { beforeInput, afterInput, ...restFormGroupProps } = formGroup || {};

  const resolvedId = id ?? name;
  const hintId = hint && `${resolvedId}-hint`;
  const errorId = errorMessage && `${resolvedId}-error`;
  const ariaDescribedBy = buildAriaDescribedBy(describedBy, hintId, errorId);
  const withError = !!errorMessage;

  const combinedClassName = classNames(
    'govuk-select',
    {
      'govuk-select--error': withError,
    },
    className,
  );

  return (
    <FormGroup {...restFormGroupProps} withError={withError}>
      <Label {...label} htmlFor={resolvedId} />

      {hint && <Hint {...hint} id={hintId} />}

      {errorMessage && <ErrorMessage {...errorMessage} id={errorId} />}

      {beforeInput}

      <select
        className={combinedClassName}
        id={resolvedId}
        name={name}
        aria-describedby={ariaDescribedBy}
        {...restSelectProps}
      >
        {items.map((item, index) => (
          <option key={`${resolvedId}-option-${index}`} {...item} />
        ))}
      </select>

      {afterInput}
    </FormGroup>
  );
};
