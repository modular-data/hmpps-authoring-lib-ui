'use client';

import { type MouseEvent } from 'react';
import classNames from 'classnames';
import {
  Link,
  Tag,
  TagColour,
  Typography,
  TypographyVariant,
} from '@modular-data/gds-components';
import {
  type DataProductBuilderStep,
  type DataProductBuilderStepMetaMap,
} from '@/features/data-products/types/steps';
import { DATA_PRODUCT_BUILDER_STEP_DEFINITIONS } from '@/features/data-products/constants/steps';
import './data-product-builder-stepper.scss';

interface DataProductBuilderStepperProps {
  className?: string;
  currentStep: DataProductBuilderStep;
  stepMetaByStep: DataProductBuilderStepMetaMap;
  onStepChange: (step: DataProductBuilderStep) => void;
}

const getStepTagColour = (isCompleted: boolean, isCurrent: boolean) => {
  if (isCurrent) {
    return TagColour.Blue;
  }

  if (isCompleted) {
    return TagColour.Green;
  }

  return TagColour.Grey;
};

export const DataProductBuilderStepper = ({
  className,
  currentStep,
  stepMetaByStep,
  onStepChange,
}: DataProductBuilderStepperProps) => {
  const createStepClickHandler = (step: DataProductBuilderStep) => {
    return (event: MouseEvent) => {
      event.preventDefault();
      onStepChange(step);
    };
  };

  const combinedClassName = classNames(
    'data-product-builder-stepper',
    className,
  );

  return (
    <nav className={combinedClassName} aria-label="Builder progress">
      <ol className="data-product-builder-stepper__list govuk-list">
        {DATA_PRODUCT_BUILDER_STEP_DEFINITIONS.map((definition, index) => {
          const { step, title, description } = definition;
          const stepMeta = stepMetaByStep[step];
          const { completed, available } = stepMeta;
          const isCurrent = step === currentStep;
          const isCompletedIndicatorVisible = completed && !isCurrent;

          const itemClassName = classNames(
            'data-product-builder-stepper__item',
            {
              'data-product-builder-stepper__item--current': isCurrent,
            },
          );

          return (
            <li key={step} className={itemClassName}>
              <Tag
                className="data-product-builder-stepper__step-tag"
                colour={getStepTagColour(completed, isCurrent)}
              >
                {isCompletedIndicatorVisible ? '✓' : index + 1}
              </Tag>

              {available ? (
                <Link
                  href="#"
                  noVisitedState
                  aria-current={isCurrent ? 'step' : undefined}
                  onClick={createStepClickHandler(step)}
                >
                  {title}
                </Link>
              ) : (
                <Typography component="span">{title}</Typography>
              )}

              <Typography
                className="data-product-builder-stepper__description"
                variant={TypographyVariant.BodyS}
              >
                {description}
              </Typography>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
