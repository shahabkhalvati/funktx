import * as fc from 'fast-check'
import { filter, find, flatten } from '../../src/core'
import { verify } from '../../src/test-utils'

describe('list helpers', () => {
  describe('find', () => {
    it('finds existing item', () => {
      fc.assert(
        fc.property(
          fc.array(fc.anything()),
          fc.array(fc.anything()),
          fc.array(fc.anything()),
          fc.anything(),
          (a, b, c, val) => {
            const input = a.concat(b, [val], c)

            verify(find((x) => x === val)(input)).is(val)
            verify(val).is(val)
          }
        )
      )
    })

    it('returns undefined when nothing is found', () => {
      fc.assert(
        fc.property(fc.anything(), (rand) => {
          verify(find((x) => x === rand)([])).is(undefined)
        })
      )
    })
  })

  describe('filter', () => {
    it('works', () => {
      const input = [1, 2, 3, 4, 5]
      const expected = [2, 4]

      const result = filter((x) => x % 2 === 0)(input)

      verify(result).is(expected)
    })

    it('handles empty input', () => {
      const input = []
      const expected = []

      const result = filter((x) => x % 2 === 0)(input)

      verify(result).is(expected)
    })
  })

  describe('flatten', () => {
    it('works', () => {
      const input = [1, 2, [3, 4], [5], [[6]]]
      const expected = [1, 2, 3, 4, 5, [6]]

      const result = flatten(input)

      verify(result).is(expected)
    })

    it('handles empty input', () => {
      const input = []
      const expected = []

      const result = flatten(input)

      verify(result).is(expected)
    })
  })
})
