import { F, compose, constant } from './function'
import { equals } from './internal/_equals'
import { ifElse } from './logic'
import { isObject } from './is'

export const hasProp = (key) =>
  ifElse(isObject, (obj) => Object.prototype.hasOwnProperty.call(obj, key), F)

export const hasPath = (key) => (object) => key in object

export const prop = (key) =>
  ifElse(hasProp(key), (obj) => obj[key], constant(undefined))

export const propOr = (defaultCase) => (key) =>
  ifElse(hasProp(key), prop(key), constant(defaultCase))

export const propSatisfies = (key) => (pred) =>
  compose(equals(true), pred, prop(key))

export const propEquals = (property) => (val) =>
  compose(equals(val), prop(property))

export const keys = ifElse(isObject, Object.keys, constant([]))
export const values = ifElse(isObject, Object.values, constant([]))
export const entries = ifElse(isObject, Object.entries, constant([]))
