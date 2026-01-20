import { asSystem } from '@ministryofjustice/hmpps-rest-client'
import { type CoreApiClient } from './core'
import { type Policies } from '../../types/entities/policy'

export class PolicyApiClient {
  private static readonly ROOT_PATH = '/policies'

  constructor(private readonly coreApiClient: CoreApiClient) {}

  async getList(): Promise<Policies> {
    return this.coreApiClient.get<Policies>({ path: PolicyApiClient.ROOT_PATH }, asSystem())
  }
}
