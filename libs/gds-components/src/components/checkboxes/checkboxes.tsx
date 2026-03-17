import { type ChangeEvent, Fragment } from 'react';
import classNames from 'classnames';
import { buildAriaDescribedBy } from '../../utils/build-aria-described-by';
import { FormGroup } from '../form-group';
import { Fieldset } from '../fieldset';
import { Hint } from '../hint';
import { ErrorMessage } from '../error-message';
import { Label } from '../label';
import {
  type CheckboxesChangeMeta,
  type CheckboxesCheckboxItem,
  type CheckboxesItem,
  type CheckboxesProps,
} from './checkboxes.types';
import {
  computeCheckboxesNextValues,
  resolveCheckboxesItemChecked,
  resolveCheckboxesItemId,
} from './helpers';

export const Checkboxes = ({
  className,
  name,
  idPrefix,
  values = [],
  items,
  describedBy,
  formGroup,
  fieldset,
  hint,
  errorMessage,
  onValuesChange,
  ...restProps
}: CheckboxesProps) => {
  const resolvedIdPrefix = idPrefix || name;

  const hintId = hint && `${resolvedIdPrefix}-hint`;
  const errorId = errorMessage && `${resolvedIdPrefix}-error`;

  const { beforeInputs, afterInputs, ...restFormGroupProps } = formGroup || {};

  const hasFieldset = !!fieldset;

  const combinedDescribedBy = buildAriaDescribedBy(
    fieldset?.describedBy || describedBy,
    hintId,
    errorId,
  );

  const createItemChangeHandler = (item: CheckboxesCheckboxItem) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const nextValues = computeCheckboxesNextValues({
        items,
        values,
        toggledValue: item.value,
        checked: event.target.checked,
      });

      const meta: CheckboxesChangeMeta = {
        name: item.name || name,
        value: item.value,
        checked: event.target.checked,
        behaviour: item.behaviour,
        event,
      };

      onValuesChange?.(nextValues, meta);
    };
  };

  const renderItem = (item: CheckboxesItem, index: number) => {
    if ('divider' in item) {
      const dividerKey = item.key || `${resolvedIdPrefix}-divider-${index + 1}`;

      return (
        <div key={dividerKey} className="govuk-checkboxes__divider">
          {item.divider}
        </div>
      );
    }

    const {
      key,
      className: inputClassName,
      name: itemName,
      label,
      hint: itemHint,
      behaviour,
      conditional,
      children,
      ...inputProps
    } = item;

    const itemId = resolveCheckboxesItemId(item, index, resolvedIdPrefix);
    const itemInputName = itemName || name;
    const itemHintId = item.hint && `${itemId}-item-hint`;
    const itemConditionalId = `conditional-${itemId}`;
    const itemIsChecked = resolveCheckboxesItemChecked(item, values);
    const itemDescribedBy = buildAriaDescribedBy(
      hasFieldset ? undefined : combinedDescribedBy,
      itemHintId,
    );

    return (
      <Fragment key={key || itemId}>
        <div className="govuk-checkboxes__item">
          <input
            {...inputProps}
            className={classNames('govuk-checkboxes__input', inputClassName)}
            id={itemId}
            name={itemInputName}
            type="checkbox"
            checked={itemIsChecked}
            data-behaviour={behaviour}
            aria-controls={conditional ? itemConditionalId : undefined}
            aria-expanded={conditional ? itemIsChecked : undefined}
            aria-describedby={itemDescribedBy}
            onChange={createItemChangeHandler(item)}
          />

          <Label
            {...label}
            htmlFor={itemId}
            className={classNames('govuk-checkboxes__label', label?.className)}
          >
            {children}
          </Label>

          {itemHint && (
            <Hint
              {...itemHint}
              id={itemHintId}
              className={classNames(
                'govuk-checkboxes__hint',
                itemHint?.className,
              )}
            />
          )}
        </div>

        {conditional && (
          <div
            id={itemConditionalId}
            className={classNames('govuk-checkboxes__conditional', {
              'govuk-checkboxes__conditional--hidden': !itemIsChecked,
            })}
          >
            {conditional}
          </div>
        )}
      </Fragment>
    );
  };

  const innerContent = (
    <>
      {hint && <Hint {...hint} id={hintId} />}

      {errorMessage && <ErrorMessage {...errorMessage} id={errorId} />}

      <div
        className={classNames('govuk-checkboxes', className)}
        data-module="govuk-checkboxes"
        {...restProps}
      >
        {beforeInputs}
        {items.map(renderItem)}
        {afterInputs}
      </div>
    </>
  );

  return (
    <FormGroup withError={!!errorMessage} {...restFormGroupProps}>
      {fieldset ? (
        <Fieldset {...fieldset} describedBy={combinedDescribedBy}>
          {innerContent}
        </Fieldset>
      ) : (
        innerContent
      )}
    </FormGroup>
  );
};
