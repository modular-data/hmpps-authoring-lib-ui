// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PartialKeys<T, K extends PropertyKey> = T extends any
  ? Omit<T, Extract<keyof T, K>> & Partial<Pick<T, Extract<keyof T, K>>>
  : never
