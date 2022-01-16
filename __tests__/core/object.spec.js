import * as fc from 'fast-check'
import { hasProp, keys, prop, propEquals, propOr } from '../../src/core'
import { verify } from '../../src/test-utils'

describe('object', () => {
  describe('prop', () => {
    it('should return correct property', () => {
      fc.assert(
        fc.property(
          fc.object(),
          fc.string().filter((str) => str.trim().length > 0),
          fc.anything(),
          (host, key, val) => {
            const target = Object.assign(host, { [key]: val })
            verify(prop(key)(target)).is(val)
          }
        )
      )
    })
    it('should return undefined for non-existent property', () => {
      const lookup = 'lookup'
      fc.assert(
        fc.property(
          fc.object().filter((obj) => !(lookup in obj)),
          (host) => {
            verify(prop(lookup)(host)).is(undefined)
          }
        )
      )
    })
    it('should handle undefined input', () => {
      fc.assert(
        fc.property(
          fc.string().filter((str) => str.trim().length > 0),
          (key) => {
            verify(prop(key)(undefined)).is(undefined)
          }
        )
      )
    })
  })

  describe('propEquals', () => {
    it('should check prop value', () => {
      fc.assert(
        fc.property(
          fc.object(),
          fc.string().filter((str) => str.trim().length > 0),
          fc.anything(),
          (host, key, val) => {
            const target = Object.assign(host, { [key]: val })
            verify(propEquals(key)(val)(target)).is(true)
            verify(propEquals(key)('not' + val)(target)).is(false)
          }
        )
      )
    })
    it('should return undefined for non-existent property', () => {
      const lookup = 'lookup'
      fc.assert(
        fc.property(
          fc.object().filter((obj) => !(lookup in obj)),
          (host) => {
            verify(propEquals(lookup)(undefined)(host)).is(true)
          }
        )
      )
    })
    it('should handle undefined input', () => {
      fc.assert(
        fc.property(
          fc.string().filter((str) => str.trim().length > 0),
          (key) => {
            verify(propEquals(key)(undefined)(undefined)).is(true)
          }
        )
      )
    })
  })

  describe('hasProp', () => {
    it('should return correct property', () => {
      fc.assert(
        fc.property(
          fc.object(),
          fc.string().filter((str) => str.trim().length > 0),
          fc.anything(),
          (host, key, val) => {
            const target = Object.assign(host, { [key]: val })
            verify(hasProp(key)(target)).is(true)
          }
        )
      )
    })
    it('should return undefined for non-existent property', () => {
      const lookup = 'lookup'
      fc.assert(
        fc.property(
          fc.object().filter((obj) => !(lookup in obj)),
          (host) => {
            verify(hasProp(lookup)(host)).is(false)
          }
        )
      )
    })
    it('should handle undefined input', () => {
      fc.assert(
        fc.property(
          fc.string().filter((str) => str.trim().length > 0),
          (key) => {
            verify(hasProp(key)(undefined)).is(false)
          }
        )
      )
    })
  })

  describe('propOr', () => {
    it('should return correct property', () => {
      fc.assert(
        fc.property(
          fc.object(),
          fc.string().filter((str) => str.trim().length > 0),
          fc.anything(),
          fc.anything(),
          (host, key, val, def) => {
            const target = Object.assign(host, { [key]: val })
            verify(propOr(def)(key)(target)).is(val)
          }
        )
      )
    })
    it('should return undefined for non-existent property', () => {
      const lookup = 'lookup'
      fc.assert(
        fc.property(
          fc.object().filter((obj) => !(lookup in obj)),
          fc.anything(),
          (host, def) => {
            verify(propOr(def)(lookup)(host)).is(def)
          }
        )
      )
    })
    it('should handle undefined input', () => {
      fc.assert(
        fc.property(
          fc.string().filter((str) => str.trim().length > 0),
          fc.anything(),
          (key, def) => {
            verify(propOr(def)(key)(undefined)).is(def)
          }
        )
      )
    })
  })
  describe('keys', () => {
    it('works', () => {
      verify(keys({ a: 'v', b: { x: 'x', y: 1 } })).is(['a', 'b'])
      verify(keys({})).is([])
      verify(keys(undefined)).is([])
      verify(keys('x')).is([])
    })
  })
})
