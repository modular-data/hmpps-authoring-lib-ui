import { type Id } from './base'

export type TagId = Id

export interface Tag {
  id: TagId
  name: string
}

export type Tags = Tag[]

export type TagReference = Pick<Tag, 'id' | 'name'>

export type TagReferences = TagReference[]
