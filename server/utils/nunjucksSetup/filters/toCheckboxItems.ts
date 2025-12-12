export interface CheckboxItem<TValue = string> {
  value: TValue
  text: string
}

export interface ToCheckboxItemsOptions<
  TItem = Record<string, unknown>,
  KValue extends keyof TItem = 'id' & keyof TItem,
  KText extends keyof TItem = 'name' & keyof TItem,
> {
  valueKey?: KValue
  textKey?: KText
}

export function toCheckboxItems<
  TItem = Record<string, unknown>,
  KValue extends keyof TItem = 'id' & keyof TItem,
  KText extends keyof TItem = 'name' & keyof TItem,
>(items: TItem[] = [], options: ToCheckboxItemsOptions<TItem, KValue, KText> = {}): CheckboxItem<TItem[KValue]>[] {
  const { valueKey = 'id' as KValue, textKey = 'name' as KText } = options

  return items.map(item => ({
    value: item[valueKey],
    text: String(item[textKey]),
  }))
}
