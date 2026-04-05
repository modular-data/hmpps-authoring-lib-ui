import { type DataProductDefinition } from '@/generated/core-api';
import { downloadFile } from '@/utils/download-file';

const getDownloadFileName = (
  dataProductDefinition: DataProductDefinition,
): string => {
  const { id, name } = dataProductDefinition;
  const fileName = (name || id).trim();

  return `${fileName}.json`;
};

export const downloadDataProductDefinition = (
  dataProductDefinition: DataProductDefinition,
) => {
  const blob = new Blob([JSON.stringify(dataProductDefinition, null, 2)], {
    type: 'application/json',
  });

  downloadFile(blob, getDownloadFileName(dataProductDefinition));
};
