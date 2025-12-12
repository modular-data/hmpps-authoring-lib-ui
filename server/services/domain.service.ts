import { type DomainApiClient } from '../data/api-clients'
import { type Domain } from '../types/entities/domain'

export class DomainService {
  constructor(private readonly domainApiClient: DomainApiClient) {}

  async getActiveDomainForUser(): Promise<Domain | null> {
    // TODO-IMPLEMENT: Since right now we don't have separate feature for domain selection, we're using just first item from the response
    const { content } = await this.domainApiClient.getList()
    const [firstDomain] = content

    return firstDomain || null
  }
}
