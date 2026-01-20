import { type GdsButton } from '../gds/button'

export type MojButtonMenuItem = Omit<GdsButton, 'isStartButton'>

export type MojButtonMenuItems = MojButtonMenuItem[]
