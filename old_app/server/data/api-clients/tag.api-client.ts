import { asSystem } from '@ministryofjustice/hmpps-rest-client'
import { type CoreApiClient } from './core'
import { type Tags } from '../../types/entities/tag'

export class TagApiClient {
  private static readonly ROOT_PATH = '/tags'

  constructor(private readonly coreApiClient: CoreApiClient) {}

  async getList(): Promise<Tags> {
    return this.coreApiClient.get<Tags>({ path: TagApiClient.ROOT_PATH }, asSystem())
  }
}
