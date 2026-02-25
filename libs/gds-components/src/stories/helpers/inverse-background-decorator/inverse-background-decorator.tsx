import { type Decorator } from '@storybook/react';
import './inverse-background-decorator.scss';

export const inverseBackgroundDecorator: Decorator = (Story) => (
  <div className="storybook-inverse-background">
    <Story />
  </div>
);
