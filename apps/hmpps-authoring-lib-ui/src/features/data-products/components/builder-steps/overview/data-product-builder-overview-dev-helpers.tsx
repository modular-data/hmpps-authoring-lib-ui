'use client';

import { useEffect, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import {
  Button,
  ButtonGroup,
  ButtonVariant,
  Details,
  Typography,
} from '@modular-data/gds-components';
import { DATA_PRODUCT_DEFAULT_VERSION } from '@/features/data-products/constants/common';
import { type OverviewStepValues } from '@/features/data-products/schemas/overview-step.schema';
import './data-product-builder-overview-dev-helpers.scss';

// TODO: Remove this or hide in production before release

interface DataProductBuilderOverviewDevHelpersProps {
  form: UseFormReturn<OverviewStepValues>;
}

type OverviewStepValueOverrides = Omit<
  Partial<OverviewStepValues>,
  'metadata'
> & {
  metadata?: Partial<OverviewStepValues['metadata']>;
};

const buildOverviewValues = (
  form: UseFormReturn<OverviewStepValues>,
  overrides: OverviewStepValueOverrides,
): OverviewStepValues => {
  const currentValues = form.getValues();
  const version =
    currentValues.metadata?.version?.trim() || DATA_PRODUCT_DEFAULT_VERSION;

  return {
    name: overrides.name ?? '',
    description: overrides.description ?? '',
    metadata: {
      author: '',
      owner: '',
      version,
      ...overrides.metadata,
    },
  };
};

export const DataProductBuilderOverviewDevHelpers = ({
  form,
}: DataProductBuilderOverviewDevHelpersProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (process.env.NODE_ENV !== 'development' || !isMounted) {
    return null;
  }

  const applyPreset = async (values: OverviewStepValues, validate = false) => {
    form.clearErrors();
    form.reset(values);

    if (validate) {
      await form.trigger();
    }
  };

  const applyValidPreset = () =>
    void applyPreset(
      buildOverviewValues(form, {
        name: 'Prison Population Daily Snapshot',
        description:
          'Daily operational snapshot of prison population metrics for reporting and analysis.',
        metadata: {
          author: 'Authoring UI manual tests',
          owner: 'Data Platform Team',
        },
      }),
    );

  const applyMissingRequiredPreset = () =>
    void applyPreset(
      buildOverviewValues(form, {
        name: '',
        description: '',
        metadata: {
          author: '',
          owner: '',
        },
      }),
      true,
    );

  const applyShortDescriptionPreset = () =>
    void applyPreset(
      buildOverviewValues(form, {
        name: 'Short description case',
        description: 'Too short',
        metadata: {
          author: 'Authoring UI manual tests',
          owner: 'Data Platform Team',
        },
      }),
      true,
    );

  const resetToBlank = () =>
    void applyPreset(
      buildOverviewValues(form, {
        metadata: {
          author: '',
          owner: '',
        },
      }),
    );

  return (
    <Details
      summary="Dev test helpers"
      className="data-product-builder-overview-dev-helpers"
    >
      <Typography className="data-product-builder-overview-dev-helpers__description">
        Apply repeatable presets to speed up manual checks of valid and invalid
        overview states.
      </Typography>
      <ButtonGroup>
        <Button
          type="button"
          variant={ButtonVariant.Secondary}
          onClick={applyValidPreset}
        >
          Fill valid values
        </Button>
        <Button
          type="button"
          variant={ButtonVariant.Secondary}
          onClick={applyMissingRequiredPreset}
        >
          Fill missing required values
        </Button>
        <Button
          type="button"
          variant={ButtonVariant.Secondary}
          onClick={applyShortDescriptionPreset}
        >
          Fill short description
        </Button>
        <Button
          type="button"
          variant={ButtonVariant.Secondary}
          onClick={resetToBlank}
        >
          Clear values
        </Button>
      </ButtonGroup>
    </Details>
  );
};
