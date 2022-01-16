import { compose, entries, hasPath, ifElse } from '.'

const _map = (fn) => (over) => over.map(fn)
const iterateOverKeys = (fn) => compose(_map(fn), entries)
export const map = (fn) => ifElse(hasPath('map'), _map(fn), iterateOverKeys(fn))

export const flatMap = (fn) => (over) => over.flatMap(fn)
