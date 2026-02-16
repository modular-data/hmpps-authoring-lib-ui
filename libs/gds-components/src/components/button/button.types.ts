import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react';
import { type NextJsLinkProps } from '../../types/nextjs';

export enum ButtonVariant {
  Secondary = 'secondary',
  Warning = 'warning',
}

type CommonButtonProps = {
  variant?: ButtonVariant;
  isInverse?: boolean;
  isStartButton?: boolean;
  disabled?: boolean;
};

type NativeButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type ButtonProps = CommonButtonProps &
  (NativeButtonProps | NextJsLinkProps);
