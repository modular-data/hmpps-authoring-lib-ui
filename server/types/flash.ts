import { type Alert } from './ui/moj/alert'

export enum FlashKey {
  Alerts = 'alerts',
}

export interface FlashPayloadMap {
  [FlashKey.Alerts]: Alert
}
