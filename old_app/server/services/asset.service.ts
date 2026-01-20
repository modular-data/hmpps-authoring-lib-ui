import { type AssetApiClient } from '../data/api-clients'
import { type AssetsByType } from '../types/entities/asset'

export class AssetService {
  constructor(private readonly assetApiClient: AssetApiClient) {}

  async getListGroupedByType(): Promise<AssetsByType> {
    return this.assetApiClient.getListGroupedByType()
  }
}
