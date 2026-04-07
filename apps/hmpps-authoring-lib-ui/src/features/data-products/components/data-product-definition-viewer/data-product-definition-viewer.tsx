'use client';

import classNames from 'classnames';
import {
  Button,
  Typography,
  TypographyVariant,
} from '@modular-data/gds-components';
import { type DataProductDefinition } from '@/generated/core-api';
import './data-product-definition-viewer.scss';

interface DataProductDefinitionViewerProps {
  className?: string;
  dataProductDefinition: DataProductDefinition;
}

export const DataProductDefinitionViewer = ({
  className,
  dataProductDefinition,
}: DataProductDefinitionViewerProps) => {
  const handleOpenFullScreen = () => {
    window.open('TODO-IMPLEMENT: Open full screen');
  };

  return (
    <div className={classNames('data-product-definition-viewer', className)}>
      <Typography variant={TypographyVariant.HeadingM}>
        Latest saved version
      </Typography>
      <Button onClick={handleOpenFullScreen}>Open full screen</Button>
      <Typography>
        JSON below is the last saved data product definition from the server.
        Unsaved changes in the form are not shown here.
      </Typography>
      <pre className="data-product-definition-viewer__json">
        {JSON.stringify(dataProductDefinition, null, 2)}
      </pre>
    </div>
  );
};
