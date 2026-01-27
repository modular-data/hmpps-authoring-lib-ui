import { type FC } from 'react';
import { type VisuallyHiddenProps } from './visually-hidden.types';

export const VisuallyHidden: FC<VisuallyHiddenProps> = ({ children }) => {
  return <span className="govuk-visually-hidden">{children}</span>;
};
