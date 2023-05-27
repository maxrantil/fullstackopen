const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
  const result = reverse('a')

  expect(result).toBe('a')
})

test('reverse of react', () => {
  const result = reverse('react')

  expect(result).toBe('tcaer')
})

test('reverse of releveler', () => {
  const result = reverse('releveler')

  expect(result).toBe('releveler')
})

test('reverse of empty string', () => {
  const result = reverse('')

  expect(result).toBe('')
})

test('reverse of palindrome', () => {
  const result = reverse('madam')

  expect(result).toBe('madam')
})

test('reverse of numeric string', () => {
  const result = reverse('12345')

  expect(result).toBe('54321')
})

test('reverse of string with special characters', () => {
  const result = reverse('a,b$c')

  expect(result).toBe('c$b,a')
})

test('reverse of string with spaces', () => {
  const result = reverse('hello world')

  expect(result).toBe('dlrow olleh')
})

test('reverse of a long string', () => {
  const result = reverse('The quick brown fox jumps over the lazy dog')

  expect(result).toBe('god yzal eht revo spmuj xof nworb kciuq ehT')
})
