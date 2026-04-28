import { describe, it, expect } from 'vitest'
import {
  formatNumber,
  formatTokenAmount,
  formatSupply,
  isValidTokenName,
  isValidTokenSymbol,
  isValidAmount,
} from '../utils/format'

describe('Format Utils', () => {
  it('should format numbers correctly', () => {
    expect(formatNumber(1000)).toBe('1,000.00')
    expect(formatNumber(0.5)).toBe('0.50')
  })

  it('should format token amounts with symbol', () => {
    expect(formatTokenAmount(1000, 'MYTKN')).toBe('1,000.00 MYTKN')
    expect(formatTokenAmount(500)).toBe('500.00')
  })

  it('should format large supply numbers', () => {
    expect(formatSupply(1_000_000)).toBe('1.00M')
    expect(formatSupply(1_000_000_000)).toBe('1.00B')
    expect(formatSupply(5_000)).toBe('5.00K')
  })

  it('should validate token names', () => {
    expect(isValidTokenName('My Token')).toBe(true)
    expect(isValidTokenName('AB')).toBe(false)
    expect(isValidTokenName('')).toBe(false)
    expect(isValidTokenName('Token@123')).toBe(false)
  })

  it('should validate token symbols', () => {
    expect(isValidTokenSymbol('MYTKN')).toBe(true)
    expect(isValidTokenSymbol('A')).toBe(false)
    expect(isValidTokenSymbol('toolong')).toBe(false)
    expect(isValidTokenSymbol('my')).toBe(false)
  })

  it('should validate amounts', () => {
    expect(isValidAmount('100')).toBe(true)
    expect(isValidAmount('0')).toBe(false)
    expect(isValidAmount('')).toBe(false)
    expect(isValidAmount('abc')).toBe(false)
  })
})