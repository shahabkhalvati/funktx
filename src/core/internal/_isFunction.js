export const isFunction = (input) =>
  !!input && {}.toString.call(input) === '[object Function]'
