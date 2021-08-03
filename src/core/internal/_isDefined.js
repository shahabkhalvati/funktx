import { complement } from '../../core'
import { isUndefined } from './_isUndefined'

export const isDefined = complement(isUndefined)
