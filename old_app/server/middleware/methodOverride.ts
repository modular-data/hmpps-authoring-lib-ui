/* eslint-disable no-underscore-dangle */
// "_method" is the industry-standard name used by method-override middleware, so we disable the rule here to allow the hidden input field with name "_method"

import expressMethodOverride from 'method-override'

export const methodOverride = () => {
  return expressMethodOverride(req => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method

      delete req.body._method

      return method
    }

    return undefined
  })
}
