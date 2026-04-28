export function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined) return '0'
  return parseFloat(num).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatTokenAmount(amount, symbol = '') {
  const formatted = formatNumber(amount, 2)
  return symbol ? `${formatted} ${symbol}` : formatted
}

export function formatSupply(supply) {
  const num = parseFloat(supply)
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`
  return formatNumber(num)
}

export function isValidTokenName(name) {
  if (!name || typeof name !== 'string') return false
  if (name.length < 3 || name.length > 32) return false
  return /^[a-zA-Z0-9 ]+$/.test(name)
}

export function isValidTokenSymbol(symbol) {
  if (!symbol || typeof symbol !== 'string') return false
  if (symbol.length < 2 || symbol.length > 6) return false
  return /^[A-Z]+$/.test(symbol)
}

export function isValidAmount(amount) {
  if (!amount) return false
  const num = parseFloat(amount)
  return !isNaN(num) && num > 0
}

export function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}