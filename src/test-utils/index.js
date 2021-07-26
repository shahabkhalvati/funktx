/*global process*/
import { compose } from '../core'

// istanbul ignore next
const _log = process.env.NODE_ENV !== 'test' ? console.log : () => {}

export const verify = (actual) => ({
  is: expect(actual).toEqual,
  isCalled: expect(actual).toBeCalled,
  isCalledWith: expect(actual).toBeCalledWith,
  isNotCalled: expect(actual).not.toBeCalled,
})

export const printMessage =
  (...messages) =>
  (data) => {
    _log(messages.join(''))
    return data
  }

export const log = (data) => (
  _log.call(undefined, JSON.stringify(data, null, 2)), data
)

export const inspect = (label) =>
  compose(
    printMessage('>>> END / ', label),
    log,
    printMessage('>>> START / ', label)
  )
