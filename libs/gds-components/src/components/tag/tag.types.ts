import { type ComponentProps } from 'react';

export enum TagColour {
  Grey = 'grey',
  Green = 'green',
  Teal = 'teal',
  Blue = 'blue',
  Purple = 'purple',
  Magenta = 'magenta',
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
}

export interface TagProps extends ComponentProps<'strong'> {
  className?: string;
  colour?: TagColour;
}
