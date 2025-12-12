import { type Id } from './base'

export enum PolicyType {
  Access = 'Access',
  Privacy = 'Privacy',
  Propagation = 'Propagation',
  DataRetention = 'DataRetention',
}

export enum PolicyEffect {
  Permit = 'Permit',
  Deny = 'Deny',
}

export enum PolicyConditionType {
  Equals = 'Equals',
  NotEquals = 'NotEquals',
  In = 'In',
  NotIn = 'NotIn',
}

interface PolicyCondition {
  type: PolicyConditionType
  key: string
  values: unknown[]
}

type PolicyConditions = PolicyCondition[]

export type PolicyId = Id

export interface Policy {
  id: PolicyId
  type: PolicyType
  effect: PolicyEffect
  name: string
  tags: string[]
  conditions: PolicyConditions
}

export type Policies = Policy[]

export type PolicyReference = Pick<Policy, 'id' | 'name'>

export type PolicyReferences = PolicyReference[]
