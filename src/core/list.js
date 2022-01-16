// import { compose } from './internal/_compose'

export const length = (input) => input.length

export const find = (pred) => (over) => over.find(pred)
export const filter = (pred) => (over) => over.filter(pred)
export const flatten = (arr) => Array.prototype.flat.call(arr)

// export const pluck = (key) => compose(map(prop(key)))
