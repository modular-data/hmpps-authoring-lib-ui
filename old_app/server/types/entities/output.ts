import { type Id } from './base'

export type OutputId = Id

export enum OutputType {
  Report = 'report',
  Dashboard = 'dashboard',
}

export interface Output {
  id: OutputId
  type: OutputType
  name: string
}

export type Outputs = Output[]

export type OutputReference = Pick<Output, 'id' | 'name' | 'type'>

export type OutputReferences = OutputReference[]

export type OutputsByType = Partial<Record<OutputType, Outputs>>

export type OutputReferencesByType = Partial<Record<OutputType, OutputReferences>>
