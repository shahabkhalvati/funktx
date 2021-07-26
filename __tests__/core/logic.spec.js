import * as fc from 'fast-check'
import {
  F,
  T,
  all,
  allPass,
  any,
  anyPass,
  both,
  either,
  ifElse,
} from '../../src/core'
import { verify } from '../../src/test-utils'

const notEmpty = (arr) => arr.length > 0

describe('logic', () => {
  describe('both', () => {
    it('both computes correct result /without input', () => {
      verify(both(T, T)()).is(true)
      verify(both(T, F)()).is(false)
      verify(both(F, T)()).is(false)
      verify(both(F, F)()).is(false)
    })

    it('both computes correct result /passing inputs', () => {
      const pred = (input) => !!input

      verify(both(pred, T)(false)).is(false)
      verify(both(pred, F)(false)).is(false)
      verify(both(pred, T)(true)).is(true)
      verify(both(pred, F)(true)).is(false)

      verify(both(T, pred)(false)).is(false)
      verify(both(F, pred)(false)).is(false)
      verify(both(T, pred)(true)).is(true)
      verify(both(F, pred)(true)).is(false)
    })
  })

  describe('either', () => {
    it('computes correct result /without input', () => {
      verify(either(T, T)()).is(true)
      verify(either(T, F)()).is(true)
      verify(either(F, T)()).is(true)
      verify(either(F, F)()).is(false)
    })

    it('computes correct result', () => {
      const pred = (input) => !!input

      verify(either(pred, T)(false)).is(true)
      verify(either(pred, F)(false)).is(false)
      verify(either(pred, T)(true)).is(true)
      verify(either(pred, F)(true)).is(true)

      verify(either(T, pred)(false)).is(true)
      verify(either(F, pred)(false)).is(false)
      verify(either(T, pred)(true)).is(true)
      verify(either(F, pred)(true)).is(true)
    })
  })

  describe('ifElse', () => {
    it('ifElse should work / if case', () => {
      const onTrue = jest.fn()
      const onFalse = jest.fn()

      ifElse(T, onTrue, onFalse)()
      verify(onTrue).isCalled()
      verify(onFalse).isNotCalled()
    })

    it('ifElse should work / else case', () => {
      const onTrue = jest.fn()
      const onFalse = jest.fn()

      ifElse(F, onTrue, onFalse)()
      verify(onTrue).isNotCalled()
      verify(onFalse).isCalled()
    })
  })

  describe('all / any', () => {
    it('happy path', () => {
      fc.assert(
        fc.property(fc.array(fc.anything()), (data) => {
          verify(all(() => true)(data)).is(true)
          if (data.length > 0) verify(any(() => true)(data)).is(true)
        })
      )
    })
    it('happy path, extended', () => {
      verify(all(() => false)([])).is(true)
      fc.assert(
        fc.property(fc.array(fc.anything()).filter(notEmpty), (data) => {
          verify(all(() => false)(data)).is(false)
          verify(any(() => false)(data)).is(false)
        })
      )
    })
    it('complex', () => {
      fc.assert(
        fc.property(
          fc.array(fc.constant(true)),
          fc.array(fc.constant(false)).filter(notEmpty),
          fc.array(fc.constant(true)),
          (a, b, c) => {
            verify(all((x) => x === true)(a.concat(b, c))).is(false)
            verify(any((x) => x === false)(a.concat(b, c))).is(true)
          }
        )
      )
    })
    it('complex, inverted', () => {
      fc.assert(
        fc.property(
          fc.array(fc.constant(false)),
          fc.array(fc.constant(true)).filter(notEmpty),
          fc.array(fc.constant(false)),
          (a, b, c) => {
            verify(all((x) => x === false)(a.concat(b, c))).is(false)
            verify(any((x) => x === true)(a.concat(b, c))).is(true)
          }
        )
      )
    })
  })

  describe('allPass', () => {
    it('computes correct result', () => {
      fc.assert(
        fc.property(fc.array(fc.constant(T)), (a) => {
          verify(allPass(a)()).is(true)
        })
      )

      fc.assert(
        fc.property(
          fc.array(fc.constant(T)),
          fc.array(fc.constant(F)).filter(notEmpty),
          fc.array(fc.constant(T)),
          (a, b, c) => {
            verify(allPass(a.concat(b, c))()).is(false)
          }
        )
      )
    })
  })

  describe('anyPass', () => {
    it('anyPass computes correct result', () => {
      fc.assert(
        fc.property(fc.array(fc.constant(F)), (a) => {
          verify(anyPass(a)()).is(false)
        })
      )

      fc.assert(
        fc.property(
          fc.array(fc.constant(F)),
          fc.array(fc.constant(T)).filter(notEmpty),
          fc.array(fc.constant(F)),
          (a, b, c) => {
            verify(anyPass(a.concat(b, c))()).is(true)
          }
        )
      )
    })
  })
})
