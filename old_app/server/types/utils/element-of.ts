export type ElementOf<TArray> = TArray extends (infer TElement)[] ? TElement : TArray
