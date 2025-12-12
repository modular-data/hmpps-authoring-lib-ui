export const formatFractionDigits = (value: number, maxFractionDigits = 2) => {
  return parseFloat(value.toFixed(maxFractionDigits))
}
