declare module '@ministryofjustice/frontend/moj/filters/all' {
  const filtersFactory: () => Record<string, (...args: unknown[]) => unknown>

  export default filtersFactory
}
