import { describe, it, expect, beforeEach } from 'vitest'
import { setCache, getCache, clearCache, clearAllCache } from '../utils/cache'

describe('Cache Utils', () => {
  beforeEach(() => localStorage.clear())

  it('should store and retrieve data from cache', () => {
    setCache('stellarmint_test', { supply: '1000' })
    expect(getCache('stellarmint_test')).toEqual({ supply: '1000' })
  })

  it('should return null for missing key', () => {
    expect(getCache('stellarmint_missing')).toBeNull()
  })

  it('should clear a specific cache key', () => {
    setCache('stellarmint_test', { supply: '1000' })
    clearCache('stellarmint_test')
    expect(getCache('stellarmint_test')).toBeNull()
  })

  it('should clear all stellarmint cache keys', () => {
    setCache('stellarmint_one', { a: 1 })
    setCache('stellarmint_two', { b: 2 })
    clearAllCache()
    expect(getCache('stellarmint_one')).toBeNull()
    expect(getCache('stellarmint_two')).toBeNull()
  })
})