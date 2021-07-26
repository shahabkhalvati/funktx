import {
  allPass,
  compose,
  constant,
  equals,
  evaluatesToTrue,
  find,
  identity,
  ifElse,
  isEmpty,
  isFunction,
  keys,
  prop,
} from '../core'
import { map } from '../types/map'

const testsFromPattern = (pattern) => {
  const testForField = (field) => {
    const tester = compose(
      ifElse(isFunction, evaluatesToTrue, equals),
      prop(field)
    )(pattern)

    return compose(tester, prop(field))
  }

  return map(testForField)(keys(pattern))
}

const isMatch = compose(
  allPass,
  ifElse(isEmpty, constant([]), testsFromPattern)
)

const isDefaultCase = ([rule]) => isFunction(rule)
const withNoRules = ([action]) => [{}, action]

const standardize = map(ifElse(isDefaultCase, withNoRules, identity))

export const match =
  (...patterns) =>
  (over) => {
    const [, action] =
      find(([pattern]) => isMatch(pattern)(over))(standardize(patterns)) || []

    return {
      fold:
        (def = () => {}) =>
        (fn = () => {}) =>
          action ? fn(action(over)) : def(over),
    }
  }
