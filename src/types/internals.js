export const VALUE_FIELD = Symbol.for('VALUE')

export const _generic = {
  map: function (type) {
    return function (f) {
      return type.of(f(this[VALUE_FIELD]))
    }
  },
  toString: function (type) {
    return function () {
      return `${type.toString()}(${this[VALUE_FIELD]})`
    }
  },
}
