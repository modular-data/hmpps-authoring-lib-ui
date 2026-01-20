import { type RequestHandler } from 'express'
import { FlashKey } from '../types/flash'

export const setUpAlerts = () => {
  const middleware: RequestHandler = (req, res, next) => {
    res.locals.alerts = req.flash(FlashKey.Alerts)

    next()
  }

  return middleware
}
