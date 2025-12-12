import { type OutputApiClient } from '../data/api-clients'
import { type OutputsByType } from '../types/entities/output'

export class OutputService {
  constructor(private readonly outputApiClient: OutputApiClient) {}

  async getListGroupedByType(): Promise<OutputsByType> {
    return this.outputApiClient.getListGroupedByType()
  }
}
