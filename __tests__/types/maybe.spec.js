import { Just, Nothing } from '../../src/types/maybe'
import { Left, Right } from '../../src/types/either'
import fc from 'fast-check'
import { identity } from '../../src/core'
import { isDefined } from '../../src/core/internal/_isDefined'
import { map } from '../../src/types/map'
import { verify } from '../../src/test-utils'

describe('Maybe', () => {
  describe('Just', () => {
    it('works', () => {
      const value = 10
      const increment = (x) => x + 1
      const result = map(increment)(Just.of(value))

      verify(result).is(Just.of(value + 1))
      verify(result.fold()(identity)).is(value + 1)
    })

    it('works with anything', () => {
      fc.assert(
        fc.property(
          fc.anything().filter((x) => x !== undefined),
          (x) => {
            const JustX = Just.of(x)
            verify(JustX).is(Just.of(x))

            const onNothing = jest.fn()

            verify(JustX.fold(onNothing)(identity)).is(x)
            verify(map(identity)(JustX)).is(Just.of(x))
            verify(onNothing).isNotCalled()
          }
        )
      )
    })
  })

  describe('Nothing', () => {
    it('works with anything', () => {
      fc.assert(
        fc.property(fc.anything(), (x) => {
          const increment = (x) => x + 1
          const result = map(increment)(Nothing.of(x))

          const onJust = jest.fn()
          const onNothing = jest.fn()

          verify(result).is(Nothing.of())
          verify(result.fold(onNothing)(onJust)).is(undefined)
          verify(onNothing).isCalledWith()
          verify(onJust).isNotCalled()
        })
      )
    })
  })

  it('Converts correctly to Either', () => {
    fc.assert(
      fc.property(fc.anything().filter(isDefined), (x) => {
        verify(Nothing.of(x).toEither('default')).is(Left.of('default'))
        verify(Just.of(x).toEither('default')).is(Right.of(x))
      })
    )
  })
})
