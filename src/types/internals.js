import { isUndefined } from '../core/internal/_isUndefined'
export const VALUE_FIELD = Symbol.for('VALUE')

export const _generic = {
  map: function (type) {
    return function (f) {
      return type.of(f(this[VALUE_FIELD]))
    }
  },
  toString: function (type) {
    return function () {
      const value = this[VALUE_FIELD]
      return `${type.toString()}(${isUndefined(value) ? '' : String(value)})`
    }
  },
  of: (type) => (v) => {
    const result = new type()
    Object.defineProperty(result, VALUE_FIELD, {
      value: v,
      enumerable: true,
    })

    return result
  },
}
