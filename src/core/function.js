export { call } from './internal/_call'
export { compose } from './internal/_compose'
export { pipe } from './internal/_pipe'

export const identity = (x) => x
export const constant = (x) => () => x

export const T = constant(true)
export const F = constant(false)

export const flip = (fn) =>
  function (a, b, ...rest) {
    return fn.call(this, b, a, ...rest)
  }
