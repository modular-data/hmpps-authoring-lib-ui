import { type DataAccess } from '../data';
import { DataSourceService } from './data-source.service';
import { DataProductService } from './data-product.service';

export const createServices = (dataAccess: DataAccess) => {
  const { dataSourceApiClient, dataProductApiClient } = dataAccess;

  const dataSourceService = new DataSourceService(dataSourceApiClient);
  const dataProductService = new DataProductService(dataProductApiClient);

  return {
    dataSourceService,
    dataProductService,
  };
};

export type Services = ReturnType<typeof createServices>;
