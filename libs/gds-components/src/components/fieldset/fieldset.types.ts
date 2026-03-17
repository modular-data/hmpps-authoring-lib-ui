import { type ComponentProps } from 'react';
import { type FieldsetLegendProps } from './fieldset-legend';

type NativeFieldsetProps = ComponentProps<'fieldset'>;

export interface FieldsetProps
  extends Omit<NativeFieldsetProps, 'aria-describedby'> {
  describedBy?: string;
  legend?: FieldsetLegendProps;
}
