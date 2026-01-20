import { asSystem } from '@ministryofjustice/hmpps-rest-client'
import { type CoreApiClient } from './core'
import { type PaginatedDomains } from '../../types/entities/domain'

export class DomainApiClient {
  private static readonly ROOT_PATH = '/domains'

  constructor(private readonly coreApiClient: CoreApiClient) {}

  async getList(): Promise<PaginatedDomains> {
    return this.coreApiClient.get<PaginatedDomains>({ path: DomainApiClient.ROOT_PATH }, asSystem())
  }
}
