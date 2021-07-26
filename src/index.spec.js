import { getName } from './index'

describe('getName', () => {
  it('should return name', () => {
    const input = 'some_name'
    const expected = input
    const actual = getName(input)

    expect(actual).toBe(expected)
  })

  it('should return buddy when no name provided', () => {
    const input = undefined
    const expected = 'buddy'
    const actual = getName(input)

    expect(actual).toBe(expected)
  })
})
