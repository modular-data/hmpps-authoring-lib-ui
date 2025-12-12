import { type DeepKeyOf } from './deep-key-of'

export type DeepValue<TObject, TPath extends DeepKeyOf<TObject>> = TPath extends `${infer TKey}.${infer TRestPath}`
  ? TKey extends keyof TObject
    ? DeepValue<TObject[TKey], TRestPath & DeepKeyOf<TObject[TKey]>>
    : never
  : TPath extends keyof TObject
    ? TObject[TPath]
    : never
