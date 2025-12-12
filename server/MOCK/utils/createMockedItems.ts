export function createMockedItems<T>(factory: () => T, length = 5): T[] {
  return Array.from({ length }, factory)
}
