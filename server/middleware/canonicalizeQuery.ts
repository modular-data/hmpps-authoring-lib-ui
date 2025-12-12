import { type Request, type Response, type NextFunction } from 'express'

export const canonicalizeQuery = () => (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') {
    return next()
  }

  const originalSearchString = req.url.split('?')[1] || ''
  const urlSearchParams = new URLSearchParams(originalSearchString)

  for (const [name, value] of urlSearchParams.entries()) {
    if (value === '') {
      urlSearchParams.delete(name, value)
    }
  }

  const newSearchString = urlSearchParams.toString()
  const newUrl = `${req.baseUrl}${req.path}${newSearchString ? `?${newSearchString}` : ''}`

  if (originalSearchString === newSearchString) {
    return next()
  }

  return res.redirect(302, newUrl)
}
