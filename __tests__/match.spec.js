import { identity } from '../src/core'
import { match } from '../src/match'
import { verify } from '../src/test-utils'

describe('match', () => {
  it('matches correct pattern', () => {
    const testAgainst = match(
      [{ value: 1 }, ({ label, value }) => `${label} is ${value}`],
      [{ value: 3 }, ({ value }) => `2 < ${value}`],
      [{ value: (n) => n < 15 }, ({ value }) => `3 < ${value}`],
      [({ value }) => `15 < ${value}`]
    )

    const def = jest.fn()

    verify(testAgainst({ label: 'field', value: 1 }).fold(def)(identity)).is(
      'field is 1'
    )
    verify(testAgainst({ label: 'field', value: 3 }).fold(def)(identity)).is(
      '2 < 3'
    )
    verify(testAgainst({ label: 'field', value: 12 }).fold(def)(identity)).is(
      '3 < 12'
    )
    verify(testAgainst({ label: 'field', value: 16 }).fold(def)(identity)).is(
      '15 < 16'
    )

    verify(def).isNotCalled()
  })

  it('handles no match', () => {
    const def = jest.fn()
    const onMatch = jest.fn()

    const testAgainst = match([{ value: 3 }, ({ value }) => `${value}`])

    verify(testAgainst({ prop: 'label', value: 3 }).fold(def)(identity)).is('3')
    verify(def).isNotCalled()

    const over = { prop: 'label', value: 13 }
    testAgainst(over).fold(def)(onMatch)

    verify(def).isCalledWith(over)
    verify(onMatch).isNotCalled()
  })
})
