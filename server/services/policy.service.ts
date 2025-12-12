import { type PolicyApiClient } from '../data/api-clients'
import { type Policies } from '../types/entities/policy'

export class PolicyService {
  constructor(private readonly policyApiClient: PolicyApiClient) {}

  async getList(): Promise<Policies> {
    return this.policyApiClient.getList()
  }
}
