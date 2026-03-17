import { type ReactNode, useEffect } from 'react';
import { type Decorator } from '@storybook/react';

interface RebrandHtmlClassWrapperProps {
  children: ReactNode;
}

const RebrandHtmlClassWrapper = ({
  children,
}: RebrandHtmlClassWrapperProps) => {
  useEffect(() => {
    document.documentElement.classList.add('govuk-template--rebranded');

    return () => {
      document.documentElement.classList.remove('govuk-template--rebranded');
    };
  }, []);

  return children;
};

export const rebrandHtmlClassDecorator: Decorator = (Story) => (
  <RebrandHtmlClassWrapper>
    <Story />
  </RebrandHtmlClassWrapper>
);
