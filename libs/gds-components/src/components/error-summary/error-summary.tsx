'use client';

import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useMergeRefs } from 'use-callback-ref';
import { ErrorSummary as GovukFrontendErrorSummary } from 'govuk-frontend';
import {
  type ErrorSummaryItem,
  type ErrorSummaryProps,
} from './error-summary.types';

export const ErrorSummary = ({
  className,
  title,
  description,
  errorList = [],
  disableAutoFocus,
  ref,
  ...restProps
}: ErrorSummaryProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mergedRootRef = useMergeRefs([rootRef, ref ?? null]);
  const combinedClassName = classNames('govuk-error-summary', className);

  const renderItem = (
    { key, children, href, ...restItemProps }: ErrorSummaryItem,
    index: number,
  ) => {
    const itemKey = key || `${'error-summary-item'}-${index}`;
    const content = href ? (
      <a href={href} {...restItemProps}>
        {children}
      </a>
    ) : (
      children
    );

    return <li key={itemKey}>{content}</li>;
  };

  useEffect(() => {
    const element = rootRef.current;

    if (!element || element.hasAttribute('data-govuk-error-summary-init')) {
      return;
    }

    new GovukFrontendErrorSummary(element);
  }, []);

  return (
    <div
      ref={mergedRootRef}
      className={combinedClassName}
      data-disable-auto-focus={disableAutoFocus}
      data-module="govuk-error-summary"
      {...restProps}
    >
      <div role="alert">
        <h2 className="govuk-error-summary__title">{title}</h2>
        <div className="govuk-error-summary__body">
          {description && <p>{description}</p>}

          {errorList.length > 0 && (
            <ul className="govuk-list govuk-error-summary__list">
              {errorList.map(renderItem)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
