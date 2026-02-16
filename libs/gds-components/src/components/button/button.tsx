import { type FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { type ButtonProps } from './button.types';
import { ButtonStartIcon } from './start-icon';

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    variant,
    isInverse,
    isStartButton,
    disabled,
    children,
    ...restProps
  } = props;

  const combinedClassName = classNames(
    'govuk-button',
    variant && `govuk-button--${variant}`,
    {
      'govuk-button--inverse': isInverse,
      'govuk-button--start': isStartButton,
    },
    className,
  );

  const content = (
    <>
      {children}
      {isStartButton && <ButtonStartIcon />}
    </>
  );

  const commonProps = {
    className: combinedClassName,
    'data-module': 'govuk-button',
    'aria-disabled': disabled ? true : undefined,
    children: content,
  };

  if ('href' in restProps) {
    return <Link {...restProps} {...commonProps} />;
  } else {
    return <button {...restProps} {...commonProps} disabled={disabled} />;
  }
};
