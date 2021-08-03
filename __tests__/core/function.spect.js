import * as fc from 'fast-check'
import { call, compose, constant, flip, identity, pipe } from '../../src/core'
import { verify } from '../../src/test-utils'

describe('function', () => {
  it('call works', () => {
    verify(call([(a, b, c) => a + b + c, 1, 2, 3])).is(6)
  })

  it('compose / pipe works', () => {
    const minus2 = (n) => n - 2
    const divide2 = (n) => n / 2
    const plus2 = (n) => n + 2
    const mul2 = (n) => n * 2

    const input = 100
    const v1 = compose(minus2, divide2, plus2, mul2)(input)
    const v2 = pipe(mul2, plus2, divide2, minus2)(input)

    verify(v1 === v2).is(true)
  })

  it('id returns passed input', () => {
    fc.assert(
      fc.property(fc.anything(), (x) => {
        verify(identity(x)).is(x)
      })
    )
  })

  it('constant returns initial input', () => {
    fc.assert(
      fc.property(fc.anything(), fc.anything(), (x, y) => {
        verify(constant(x)(y)).is(x)
      })
    )
  })

  it('flip works', () => {
    fc.assert(
      fc.property(
        fc.anything(),
        fc.anything(),
        fc.anything(),
        fc.array(fc.anything()),
        (thisParam, a, b, host) => {
          const merge = (x, y, ...z) => [x, y, ...z]

          verify(flip(merge)(a, b, ...host)).is(merge(b, a, ...host))
        }
      )
    )
  })

  it('flip preserves this', () => {
    fc.assert(
      fc.property(fc.anything(), (thisParam) => {
        const thisDependant = function (a, b) {
          return [this, a, b]
        }

        verify(flip(thisDependant).call(thisParam, 1, 2)).is(
          thisDependant.call(thisParam, 2, 1)
        )
      })
    )
  })
})
