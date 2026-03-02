import { type Id } from './base';
import { type Paginated } from './pagination';

// TODO: Complete Data Product entity

export type DataProductId = Id;

export enum DataProductState {
  Draft = 'draft',
  Published = 'published',
  Launched = 'launched',
}

interface DataProductMetadata {
  owner: string;
  author: string;
  version: string;
}

export interface DataProduct {
  id: DataProductId;
  name: string;
  description: string;
  state: DataProductState;
  metadata: DataProductMetadata;
}

export type DataProducts = DataProduct[];

export type PaginatedDataProducts = Paginated<DataProduct>;

export enum DataProductAction {
  Preview = 'preview',
  ApproveAndPublish = 'approve-and-publish',
  Promote = 'promote',
}
