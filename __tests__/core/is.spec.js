import * as fc from 'fast-check'
import {
  isArray,
  isEmpty,
  isFunction,
  isNil,
  isNumber,
  isString,
} from '../../src/core'
import { verify } from '../../src/test-utils'

describe('is', () => {
  it('can properly type check strings', () => {
    fc.assert(
      fc.property(fc.string(), (sample) => {
        verify(isString(sample)).is(true)
        verify(isNumber(sample)).is(false)
        verify(isArray(sample)).is(false)
        verify(isNil(sample)).is(false)
        verify(isFunction(sample)).is(false)
      })
    )
  })

  it('can properly type check numbers', () => {
    fc.assert(
      fc.property(fc.integer(), (sample) => {
        verify(isString(sample)).is(false)
        verify(isNumber(sample)).is(true)
        verify(isArray(sample)).is(false)
        verify(isNil(sample)).is(false)
        verify(isFunction(sample)).is(false)
        verify(isEmpty(sample)).is(false)
      })
    )
  })

  it('can properly type check arrays', () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), (sample) => {
        verify(isString(sample)).is(false)
        verify(isNumber(sample)).is(false)
        verify(isArray(sample)).is(true)
        verify(isNil(sample)).is(false)
        verify(isFunction(sample)).is(false)
      })
    )
  })

  it('can properly type check Nils', () => {
    fc.assert(
      fc.property(fc.constantFrom(null, undefined), (input) => {
        verify(isString(input)).is(false)
        verify(isNumber(input)).is(false)
        verify(isArray(input)).is(false)
        verify(isNil(input)).is(true)
        verify(isFunction(input)).is(false)
        verify(isEmpty(input)).is(false)
      })
    )
  })

  it('can properly type check functions', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          () => {},
          function sampleFunction() {}
        ),
        (input) => {
          verify(isString(input)).is(false)
          verify(isNumber(input)).is(false)
          verify(isArray(input)).is(false)
          verify(isNil(input)).is(false)
          verify(isFunction(input)).is(true)
          verify(isEmpty(input)).is(false)
        }
      )
    )
  })
})
