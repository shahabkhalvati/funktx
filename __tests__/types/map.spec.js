import { flatMap, map } from '../../src/types/map'
import { identity } from '../../src/core'
import { verify } from '../../src/test-utils'

describe('type helpers', () => {
  describe('map', () => {
    it('should use available map', () => {
      const input = [1, 2, 3]
      verify(map(identity)(input)).is([1, 2, 3])

      const inputObj = {
        prop: 'prop',
        prop2: 'prop2',
        map: (fn) => [1, 2, 3].map(fn),
      }
      verify(map(identity)(inputObj)).is([1, 2, 3])
    })

    it('should iterate over key/value pairs when passed an object', () => {
      const input = {
        prop: 'prop val',
        prop2: 'prop2 val',
      }

      verify(map(identity)(input)).is([
        ['prop', 'prop val'],
        ['prop2', 'prop2 val'],
      ])
    })
  })

  describe('flatMap', () => {
    it('should use available map', () => {
      const input = [[1], [2, 3], [4]]
      verify(flatMap(identity)(input)).is([1, 2, 3, 4])
    })
  })
})
