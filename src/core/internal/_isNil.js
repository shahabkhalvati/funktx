import { complement } from '../../core'
export const isUndefined = (input) => typeof input === 'undefined'
export const isDefined = complement(isUndefined)

export const isNil = (input) => input === null || isUndefined(input)
