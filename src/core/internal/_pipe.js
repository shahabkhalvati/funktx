import { compose } from './_compose'

export const pipe = (...fns) => compose.apply(null, fns.reverse())
