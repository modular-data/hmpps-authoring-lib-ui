import { type TagApiClient } from '../data/api-clients'
import { type Tags } from '../types/entities/tag'

export class TagService {
  constructor(private readonly tagApiClient: TagApiClient) {}

  async getList(): Promise<Tags> {
    return this.tagApiClient.getList()
  }
}
