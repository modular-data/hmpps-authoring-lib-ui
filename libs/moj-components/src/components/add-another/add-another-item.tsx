import { type FC } from 'react';
import {
  Button,
  ButtonVariant,
  Fieldset,
  FieldsetLegendVariant,
} from '@modular-data/gds-components';
import { type AddAnotherItemProps } from './add-another.types';

export const AddAnotherItem: FC<AddAnotherItemProps> = ({
  title,
  children,
  onRemove,
}) => (
  <Fieldset
    className="moj-add-another__item"
    legend={{
      className: 'moj-add-another__title',
      variant: FieldsetLegendVariant.M,
      children: title,
    }}
  >
    {children}
    {onRemove && (
      <Button
        className="moj-add-another__remove-button"
        variant={ButtonVariant.Secondary}
        type="button"
        onClick={onRemove}
      >
        Remove
      </Button>
    )}
  </Fieldset>
);
