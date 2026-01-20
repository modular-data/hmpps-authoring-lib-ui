import { formatFractionDigits } from './formatFractionDigits'

export const formatPercents = (value: number) => {
  return `${formatFractionDigits(value)}%`
}
