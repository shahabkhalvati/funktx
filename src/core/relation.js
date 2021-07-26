import { allPass } from './logic'
export { equals } from './internal/_equals'

export const isLessThan = (x) => (y) => y < x
export const isLessThanOrEqualTo = (x) => (y) => y <= x
export const isGreaterThan = (x) => (y) => y > x
export const isGreaterThanOrEqualTo = (x) => (y) => y >= x

export const isInRange = (low, cap) =>
  allPass([isGreaterThan(low), isLessThan(cap)])

export const isInRangeOrEqualTo = (low, cap) =>
  allPass([isGreaterThanOrEqualTo(low), isLessThanOrEqualTo(cap)])
