import { type ComponentProps, type ReactNode } from 'react';

export interface AddAnotherProps extends ComponentProps<'div'> {
  className?: string;
  headingText?: string;
  addButtonText?: string;
  children?: ReactNode;
  onAdd: () => void;
}

export interface AddAnotherItemProps {
  title: string;
  children?: ReactNode;
  onRemove?: () => void;
}
