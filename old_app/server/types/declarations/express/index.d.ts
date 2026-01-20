import { type HmppsUser } from '../../entities/hmpps-user'
import { type FlashKey, type FlashPayloadMap } from '../../flash'
import { type Alerts } from '../../ui/moj/alert'
import { type RouteDefinitions } from '../../../utils/route-definitions'
import { type PageContext } from '../../page-context'
import { type ServiceNavigationItems } from '../../ui/gds/service-navigation'

export declare module 'express-session' {
  // Declare that the session will potentially contain these additional fields
  interface SessionData {
    returnTo: string
    nowInMinutes: number
  }
}

export declare global {
  namespace Express {
    interface User {
      username: string
      token: string
      authSource: string
    }

    interface Request {
      verified?: boolean
      id: string

      flash<K extends FlashKey>(key: K): FlashPayloadMap[K][]
      flash<K extends FlashKey>(key: K, value: FlashPayloadMap[K] | FlashPayloadMap[K][]): number

      logout(done: (err: unknown) => void): void
    }

    interface Locals {
      user: HmppsUser
      basePath: string
      routeDefinitions: RouteDefinitions
      pageContext: PageContext
      alerts: Alerts
      serviceNavigationItems: ServiceNavigationItems
    }
  }
}
