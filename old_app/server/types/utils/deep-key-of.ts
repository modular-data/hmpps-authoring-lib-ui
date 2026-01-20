export type DeepKeyOf<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object ? K | `${K}.${DeepKeyOf<T[K]>}` : K
    }[keyof T & string]
  : never
