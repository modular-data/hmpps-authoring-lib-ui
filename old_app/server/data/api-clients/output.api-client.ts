import { asSystem } from '@ministryofjustice/hmpps-rest-client'
import { type CoreApiClient } from './core'
import { type OutputsByType } from '../../types/entities/output'

export class OutputApiClient {
  private static readonly ROOT_PATH = '/outputs'

  constructor(private readonly coreApiClient: CoreApiClient) {}

  async getListGroupedByType(): Promise<OutputsByType> {
    return this.coreApiClient.get<OutputsByType>({ path: OutputApiClient.ROOT_PATH }, asSystem())
  }
}
