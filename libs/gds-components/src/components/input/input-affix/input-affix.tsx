import classNames from 'classnames';
import { type InputAffixProps } from './input-affix.types';

export const InputAffix = ({
  className,
  type,
  'aria-hidden': ariaHidden,
  ...restAffixProps
}: InputAffixProps) => (
  <div
    className={classNames(`govuk-input__${type}`, className)}
    aria-hidden={ariaHidden ?? true}
    {...restAffixProps}
  />
);
