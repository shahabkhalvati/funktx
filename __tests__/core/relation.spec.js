import * as fc from 'fast-check'
import {
  complement,
  isGreaterThan,
  isGreaterThanOrEqualTo,
  isInRange,
  isInRangeOrEqualTo,
  isLessThan,
  isLessThanOrEqualTo,
} from '../../src/core'
import { verify } from '../../src/test-utils'

describe('relation', () => {
  it('number comparison works', () => {
    fc.assert(
      fc.property(fc.oneof(fc.integer(), fc.float(), fc.bigInt()), (num) => {
        verify(isLessThan(num)(num)).is(false)
        verify(isGreaterThan(num)(num)).is(false)

        if (Number.isNaN(num)) {
          verify(isLessThanOrEqualTo(num)(num)).is(false)
          verify(isGreaterThanOrEqualTo(num)(num)).is(false)
        } else {
          verify(isLessThanOrEqualTo(num)(num)).is(true)
          verify(isGreaterThanOrEqualTo(num)(num)).is(true)
        }
      })
    )
  })

  it('range works with integers and floats', () => {
    fc.assert(
      fc.property(
        fc.oneof(fc.integer(), fc.float()).filter(complement(Number.isNaN)),
        fc.oneof(fc.integer(), fc.float()).filter(complement(Number.isNaN)),
        fc.oneof(fc.integer(), fc.float()).filter(complement(Number.isNaN)),
        fc
          .oneof(fc.integer({ min: 1 }), fc.float({ min: 1 }))
          .filter(complement(Number.isNaN)),
        (a, b, c, positiveNum) => {
          const [min, y, max] = [a, b, c].sort((a, b) => a - b)

          verify(isInRange(min - positiveNum, max + positiveNum)(y)).is(true)
          verify(isInRangeOrEqualTo(min, max)(y)).is(true)
        }
      )
    )
  })

  it('range works with bigInt', () => {
    fc.assert(
      fc.property(
        fc.bigInt(),
        fc.bigInt(),
        fc.bigInt(),
        fc.bigInt({ min: 1n }),
        (a, b, c, positiveNum) => {
          const [min, y, max] = [a, b, c].sort((a, b) => {
            if (isGreaterThan(a)(b)) return -1
            if (isLessThan(a)(b)) return 1
            return 0
          })

          verify(isInRange(min - positiveNum, max + positiveNum)(y)).is(true)
          verify(isInRangeOrEqualTo(min, max)(y)).is(true)
        }
      )
    )
  })
})
