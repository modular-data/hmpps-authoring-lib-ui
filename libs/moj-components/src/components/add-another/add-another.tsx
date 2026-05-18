import { type FC } from 'react';
import classNames from 'classnames';
import {
  Button,
  ButtonVariant,
  Typography,
  TypographyVariant,
} from '@modular-data/gds-components';
import { type AddAnotherProps } from './add-another.types';

export const AddAnother: FC<AddAnotherProps> = ({
  className,
  headingText,
  addButtonText = 'Add another',
  children,
  onAdd,
  ...restProps
}) => (
  <div
    className={classNames('moj-add-another', className)}
    data-module="moj-add-another"
    {...restProps}
  >
    {headingText && (
      <Typography
        className="moj-add-another__heading"
        variant={TypographyVariant.HeadingL}
        tabIndex={-1}
      >
        {headingText}
      </Typography>
    )}
    {children}
    <div className="moj-button-action">
      <Button
        className="moj-add-another__add-button"
        variant={ButtonVariant.Secondary}
        type="button"
        onClick={onAdd}
      >
        {addButtonText}
      </Button>
    </div>
  </div>
);
