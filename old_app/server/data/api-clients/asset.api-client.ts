import { asSystem } from '@ministryofjustice/hmpps-rest-client'
import { type CoreApiClient } from './core'
import { type AssetsByType } from '../../types/entities/asset'

export class AssetApiClient {
  private static readonly ROOT_PATH = '/assets'

  constructor(private readonly coreApiClient: CoreApiClient) {}

  async getListGroupedByType(): Promise<AssetsByType> {
    return this.coreApiClient.get<AssetsByType>({ path: AssetApiClient.ROOT_PATH }, asSystem())
  }
}
