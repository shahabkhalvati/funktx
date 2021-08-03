import { isUndefined } from './_isUndefined'

export const isNil = (input) => input === null || isUndefined(input)
