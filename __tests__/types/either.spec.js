import { Left, Right } from '../../src/types/either'
import fc from 'fast-check'
import { identity } from '../../src/core'
import { map } from '../../src/types/map'
import { verify } from '../../src/test-utils'

describe('Right', () => {
  it('works', () => {
    const value = 10
    const increment = (x) => x + 1
    const result = map(increment)(Right.of(value))

    verify(result).is(Right.of(value + 1))
    verify(result.fold()(identity)).is(value + 1)
  })

  it('works with anything', () => {
    fc.assert(
      fc.property(
        fc.anything().filter((x) => x !== undefined),
        (x) => {
          const RightX = Right.of(x)
          verify(RightX).is(Right.of(x))

          const onLeft = jest.fn()

          verify(RightX.fold(onLeft)(identity)).is(x)
          verify(map(identity)(RightX)).is(Right.of(x))
          verify(onLeft).isNotCalled()
        }
      )
    )
  })
})

describe('Left', () => {
  it('works with anything', () => {
    fc.assert(
      fc.property(fc.anything(), (x) => {
        const increment = (x) => x + 1
        const result = map(increment)(Left.of(x))

        const onRight = jest.fn()
        const onLeft = jest.fn(identity)

        verify(result.fold(onLeft)(onRight)).is(x)
        verify(onRight).isNotCalled()
        verify(result).is(Left.of(x))
        verify(onLeft).isCalledWith(x)
      })
    )
  })
})
