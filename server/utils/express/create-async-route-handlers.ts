import { type RequestHandler, type Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'

const wrapAllHandlers = (handlers: RequestHandler[]) => handlers.map(asyncMiddleware)

export const createAsyncRouteHandlers = (router: Router) => {
  const createHandler = (method: 'get' | 'post' | 'put' | 'delete' | 'patch') => {
    return (path: string | string[], ...handlers: RequestHandler[]) => {
      return router[method](path, ...wrapAllHandlers(handlers))
    }
  }

  return {
    get: createHandler('get'),
    post: createHandler('post'),
    put: createHandler('put'),
    delete: createHandler('delete'),
  }
}
