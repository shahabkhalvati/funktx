import * as fc from 'fast-check'
import { call, compose, constant, identity, pipe } from '../../src/core'
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
})
