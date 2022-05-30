import { compose } from './function'
import { equals } from './internal/_equals'
import { isFunction } from './internal/_isFunction'

export const isTrue = equals(true)
export const isFalse = equals(false)

export const ifElse = (pred, onTrue, onFalse) => (input) => {
  return pred(input) ? onTrue(input) : onFalse(input)
}

export const evaluatesToTrue = (pred) => compose(isTrue, pred)

export const _complement = (pred) => (input) => !pred(input)
export const complement = ifElse(isFunction, _complement, (x) => !x)
export const not = complement

export const both = (pred1, pred2) => (arg) => isTrue(pred1(arg) && pred2(arg))
export const either = (pred1, pred2) => (arg) =>
  isTrue(pred1(arg) || pred2(arg))

export const all = (pred) => (values) => values.every(evaluatesToTrue(pred))
export const any = (pred) => (values) => values.some(evaluatesToTrue(pred))

export const allPass = (preds) => (value) =>
  preds.every((pred) => isTrue(pred(value)))

export const anyPass = (preds) => (value) =>
  preds.some((pred) => isTrue(pred(value)))
