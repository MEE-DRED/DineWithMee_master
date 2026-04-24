import { describe, it, expect, vi } from 'vitest'
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  getPasswordStrength,
  formatPhoneNumber,
  debounce,
  throttle,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateRange,
  validateInteger,
  validatePositive
} from './validationHelpers'

describe('validationHelpers', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('user+tag@example.com')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('invalid@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('invalid@.com')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      expect(validatePassword('Password123!')).toBe(true)
      expect(validatePassword('Secure@Pass1')).toBe(true)
    })

    it('should reject weak passwords', () => {
      expect(validatePassword('password')).toBe(false)
      expect(validatePassword('PASSWORD')).toBe(false)
      expect(validatePassword('Pass123')).toBe(false)
      expect(validatePassword('Pass!')).toBe(false)
      expect(validatePassword('')).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('should validate phone numbers', () => {
      expect(validatePhone('1234567890')).toBe(true)
      expect(validatePhone('(123) 456-7890')).toBe(true)
      expect(validatePhone('+1 234 567 8900')).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('123')).toBe(false)
      expect(validatePhone('abcdefghij')).toBe(false)
      expect(validatePhone('')).toBe(false)
    })
  })

  describe('validateName', () => {
    it('should validate names', () => {
      expect(validateName('John Doe')).toBe(true)
      expect(validateName('Jane')).toBe(true)
      expect(validateName('Mary Ann')).toBe(true)
    })

    it('should reject invalid names', () => {
      expect(validateName('J')).toBe(false)
      expect(validateName('John123')).toBe(false)
      expect(validateName('John@Doe')).toBe(false)
      expect(validateName('')).toBe(false)
    })
  })

  describe('getPasswordStrength', () => {
    it('should return very weak for empty password', () => {
      const result = getPasswordStrength('')
      expect(result.strength).toBe(0)
      expect(result.label).toBe('Very Weak')
      expect(result.color).toBe('red')
    })

    it('should return weak for simple password', () => {
      const result = getPasswordStrength('password')
      expect(result.strength).toBeLessThanOrEqual(2)
    })

    it('should return strong for complex password', () => {
      const result = getPasswordStrength('Password123!')
      expect(result.strength).toBeGreaterThanOrEqual(4)
      expect(result.checks.length).toBe(true)
      expect(result.checks.lowercase).toBe(true)
      expect(result.checks.uppercase).toBe(true)
      expect(result.checks.number).toBe(true)
      expect(result.checks.special).toBe(true)
    })
  })

  describe('formatPhoneNumber', () => {
    it('should format 10-digit phone numbers', () => {
      expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890')
    })

    it('should return original for non-10-digit numbers', () => {
      expect(formatPhoneNumber('123456789')).toBe('123456789')
      expect(formatPhoneNumber('12345678901')).toBe('12345678901')
    })
  })

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      expect(mockFn).not.toHaveBeenCalled()

      await new Promise(resolve => setTimeout(resolve, 150))
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle', () => {
    it('should throttle function calls', async () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn()
      throttledFn()
      throttledFn()

      expect(mockFn).toHaveBeenCalledTimes(1)

      await new Promise(resolve => setTimeout(resolve, 150))
      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(2)
    })
  })

  describe('validateRequired', () => {
    it('should validate required values', () => {
      expect(validateRequired('value')).toBe(true)
      expect(validateRequired(['item'])).toBe(true)
      expect(validateRequired(123)).toBe(true)
    })

    it('should reject empty values', () => {
      expect(validateRequired('')).toBe(false)
      expect(validateRequired('   ')).toBe(false)
      expect(validateRequired([])).toBe(false)
      expect(validateRequired(null)).toBe(false)
      expect(validateRequired(undefined)).toBe(false)
    })
  })

  describe('validateMinLength', () => {
    it('should validate minimum length for strings', () => {
      expect(validateMinLength('hello', 3)).toBe(true)
      expect(validateMinLength('hello', 5)).toBe(true)
      expect(validateMinLength('hi', 3)).toBe(false)
    })

    it('should validate minimum length for arrays', () => {
      expect(validateMinLength([1, 2, 3], 2)).toBe(true)
      expect(validateMinLength([1], 2)).toBe(false)
    })
  })

  describe('validateMaxLength', () => {
    it('should validate maximum length for strings', () => {
      expect(validateMaxLength('hi', 5)).toBe(true)
      expect(validateMaxLength('hello world', 5)).toBe(false)
    })

    it('should validate maximum length for arrays', () => {
      expect(validateMaxLength([1, 2], 3)).toBe(true)
      expect(validateMaxLength([1, 2, 3, 4], 3)).toBe(false)
    })
  })

  describe('validateRange', () => {
    it('should validate numbers within range', () => {
      expect(validateRange(5, 1, 10)).toBe(true)
      expect(validateRange(1, 1, 10)).toBe(true)
      expect(validateRange(10, 1, 10)).toBe(true)
    })

    it('should reject numbers outside range', () => {
      expect(validateRange(0, 1, 10)).toBe(false)
      expect(validateRange(11, 1, 10)).toBe(false)
      expect(validateRange('invalid', 1, 10)).toBe(false)
    })
  })

  describe('validateInteger', () => {
    it('should validate integers', () => {
      expect(validateInteger(5)).toBe(true)
      expect(validateInteger(0)).toBe(true)
      expect(validateInteger(-5)).toBe(true)
    })

    it('should reject non-integers', () => {
      expect(validateInteger(5.5)).toBe(false)
      expect(validateInteger('5.5')).toBe(false)
      expect(validateInteger('invalid')).toBe(false)
    })
  })

  describe('validatePositive', () => {
    it('should validate positive numbers', () => {
      expect(validatePositive(5)).toBe(true)
      expect(validatePositive(0.1)).toBe(true)
    })

    it('should reject non-positive numbers', () => {
      expect(validatePositive(0)).toBe(false)
      expect(validatePositive(-5)).toBe(false)
      expect(validatePositive('invalid')).toBe(false)
    })
  })
})
