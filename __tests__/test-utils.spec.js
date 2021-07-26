/*global global*/

import * as fc from 'fast-check'

import { inspect, log, printMessage, verify } from '../src/test-utils'

describe('test-utils', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('printMessage', () => {
    beforeEach(() => {
      jest.restoreAllMocks()
    })

    it('returns its input', () => {
      jest.spyOn(global.console, 'log').mockImplementation(() => {})
      fc.assert(
        fc.property(fc.string(), fc.anything(), (message, input) => {
          verify(printMessage(message)(input)).is(input)
        })
      )
    })
  })

  describe('log', () => {
    beforeEach(() => {
      jest.restoreAllMocks()
    })

    it('returns its input', () => {
      jest.spyOn(global.console, 'log').mockImplementation(() => {})
      fc.assert(
        fc.property(fc.anything(), (input) => {
          verify(log(input)).is(input)
        })
      )
    })
  })

  describe('inspect', () => {
    beforeEach(() => {
      jest.restoreAllMocks()
    })

    it('returns its input', () => {
      jest.spyOn(global.console, 'log').mockImplementation(() => {})
      fc.assert(
        fc.property(fc.string(), fc.anything(), (message, input) => {
          verify(inspect(message)(input)).is(input)
        })
      )
    })
  })
})
