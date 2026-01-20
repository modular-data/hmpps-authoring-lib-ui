import { type RequestHandler } from 'express'

export const setUpServiceNavigation = (): RequestHandler => {
  return (_, res, next) => {
    const { routeDefinitions, pageContext } = res.locals
    const { pathname } = pageContext

    res.locals.serviceNavigationItems = [
      {
        href: routeDefinitions.home.createUrl(),
        text: 'Home',
        get active() {
          return pathname === this.href
        },
      },
      {
        href: routeDefinitions.dataProducts.createUrl(),
        text: 'Data Products',
        get active() {
          return pathname.startsWith(this.href)
        },
      },
      {
        href: routeDefinitions.datasets.createUrl(),
        text: 'Datasets',
        get active() {
          return pathname.startsWith(this.href)
        },
      },
      {
        href: routeDefinitions.dataProducts.createUrl({ bookmarked: true }),
        text: 'Bookmarks',
      },
    ]

    next()
  }
}
