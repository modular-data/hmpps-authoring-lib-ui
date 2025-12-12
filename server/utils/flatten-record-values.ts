export const flattenRecordValues = <TValue>(record: Record<string, TValue | TValue[]>): TValue[] => {
  return Object.values(record).flatMap(value => (Array.isArray(value) ? value : [value]))
}
