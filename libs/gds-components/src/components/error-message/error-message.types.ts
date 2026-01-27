import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

type NativeParagraphProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export type ErrorMessageProps = NativeParagraphProps & {
  visuallyHiddenText?: string;
};
