import { Id } from '../../src/types/id'
import fc from 'fast-check'
import { identity } from '../../src/core'
import { map } from '../../src/types/map'
import { verify } from '../../src/test-utils'

describe('Id', () => {
  it('works', () => {
    const value = 10
    const result = map(identity)(Id.of(value))

    verify(result).is(Id.of(value))
    verify(result.fold(identity)).is(value)
  })

  it('works with anything', () => {
    fc.assert(
      fc.property(
        fc.anything().filter((x) => x !== undefined),
        (x) => {
          const id = Id.of(x)

          verify(id.fold(identity)).is(x)
          verify(map(identity)(id)).is(Id.of(x))
        }
      )
    )
  })
})
