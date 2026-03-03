import { type ComponentProps } from 'react';

export enum GridColumnVariant {
  Full = 'full',
  ThreeQuarters = 'three-quarters',
  TwoThirds = 'two-thirds',
  OneHalf = 'one-half',
  OneThird = 'one-third',
  OneQuarter = 'one-quarter',
}

type GridColumnSizingProps =
  | { variant: GridColumnVariant; desktopVariant?: GridColumnVariant }
  | { variant?: undefined; desktopVariant: GridColumnVariant };

export type GridColumnProps = ComponentProps<'div'> & GridColumnSizingProps;
