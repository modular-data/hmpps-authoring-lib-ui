import { type DeepKeyOf } from '../types/utils/deep-key-of'
import { type DeepValue } from '../types/utils/deep-value'

export const deepGet = <TObject, TPath extends DeepKeyOf<TObject>>(
  object: TObject,
  path: TPath,
): DeepValue<TObject, TPath> => {
  const pathSegments = path.split('.')

  // "any" scoped to reducer due to TS limitation: cannot type-narrow through dynamic dot-paths.
  // Return type still enforced via DeepValue for external type safety.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return pathSegments.reduce<any>((accumulator, pathSegment) => accumulator?.[pathSegment], object)
}
