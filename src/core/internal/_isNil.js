export const isUndefined = (input) => typeof input === 'undefined'
export const isNil = (input) => input === null || isUndefined(input)
