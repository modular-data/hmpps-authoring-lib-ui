type ObjectFieldPath<TObject> = TObject extends object
  ? {
      [TKey in keyof TObject & string]: `${TKey}` | `${TKey}[${FormFieldPath<TObject[TKey]>}]`
    }[keyof TObject & string]
  : never

type ArrayFieldPath<TArray> = TArray extends (infer TItem)[]
  ? `${number}` | `${number}[${FormFieldPath<TItem>}]`
  : never

export type FormFieldPath<TValue> = ObjectFieldPath<TValue> | ArrayFieldPath<TValue>
