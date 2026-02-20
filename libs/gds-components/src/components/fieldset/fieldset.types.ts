import { type ComponentProps } from 'react';
import { type FieldsetLegendProps } from './fieldset-legend';

export interface FieldsetProps extends ComponentProps<'fieldset'> {
  legend?: FieldsetLegendProps;
}
