import { allPass, anyPass, both, complement } from './logic'
import { isFunction as _isFunction } from './internal/_isFunction'
import { isNil as _isNil } from './internal/_isNil'
import { compose } from './function'
import { equals } from './internal/_equals'
import { length } from './list'
import { typeOf } from './internal/_typeOf'

const isType = (typeName) => compose(equals(typeName), typeOf)

export const isBool = isType('boolean')
export const isNumber = isType('number')
export const isBigInt = isType('bigint')
export const isSymbol = isType('symbol')
export const isString = isType('string')

export const isArray = Array.isArray
const lengthIsZero = compose(equals(0), length)
export const isEmptyArray = both(isArray, lengthIsZero)

export const isFunction = _isFunction
export const isNil = _isNil

export const isObject = allPass([
  complement(isNil),
  isType('object'),
  complement(isFunction),
])

export const isEmptyObject = both(
  isObject,
  compose(equals(0), length, Object.keys)
)

const isEmptyString = equals('')
export const isEmpty = anyPass([isEmptyString, isEmptyArray, isEmptyObject])
