const average = require('../utils/for_testing').average

describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })

  test('of array with negative values', () => {
    expect(average([-1, -2, -3, -4, -5])).toBe(-3)
  })

  test('of array with both positive and negative values', () => {
    expect(average([-1, 2, -3, 4, -5])).toBe(-0.6)
  })

  test('of array with floating point values', () => {
    expect(average([1.5, 2.5, 3.5])).toBeCloseTo(2.5)
  })

  test('of large numbers', () => {
    expect(average([1000000, 2000000, 3000000])).toBe(2000000)
  })

  test('of array with zero values', () => {
    expect(average([0, 0, 0, 0])).toBe(0)
  })

  test('of array with one negative value', () => {
    expect(average([-1])).toBe(-1)
  })

})