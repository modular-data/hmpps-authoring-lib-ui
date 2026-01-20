import { type Request } from 'express'

export const isJsonRequest = (req: Request): boolean => {
  return req.accepts(['json', 'html']) === 'json'
}
