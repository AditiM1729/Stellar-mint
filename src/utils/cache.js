const CACHE_TTL = 30000

export function setCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }))
  } catch (e) {
    console.warn('Cache write failed:', e.message)
  }
}

export function getCache(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(key)
      return null
    }
    return data
  } catch (e) {
    return null
  }
}

export function clearCache(key) {
  try { localStorage.removeItem(key) }
  catch (e) { console.warn('Cache clear failed:', e.message) }
}

export function clearAllCache() {
  try {
    Object.keys(localStorage)
      .filter(k => k.startsWith('stellarmint_'))
      .forEach(k => localStorage.removeItem(k))
  } catch (e) {
    console.warn('Cache clear all failed:', e.message)
  }
}