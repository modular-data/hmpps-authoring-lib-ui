import express, { type Request } from 'express'

const getRequestOrigin = (req: Request): string => {
  const { protocol } = req
  const host = req.get('host')

  return `${protocol}://${host}`
}

export const setUpPageContext = () => {
  const router = express.Router()

  router.use((req, res, next) => {
    const { path, query } = req
    const basePath = res.locals.basePath ?? ''

    const pathname = `${basePath}${path}`

    res.locals.pageContext = {
      origin: getRequestOrigin(req),
      pathname,
      query,
    }

    next()
  })

  return router
}
