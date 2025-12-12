export const toRecordBy = <TItem, TKey extends string | number | symbol>(
  items: TItem[],
  keyGetter: (item: TItem) => TKey,
): Record<TKey, TItem> => {
  return items.reduce(
    (accumulator, item) => {
      accumulator[keyGetter(item)] = item

      return accumulator
    },
    {} as Record<TKey, TItem>,
  )
}
