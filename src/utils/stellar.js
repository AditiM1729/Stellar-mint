export function shortAddress(address) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-6)}`
}

export function isValidAddress(address) {
  if (!address || typeof address !== 'string') return false
  if (!address.startsWith('G')) return false
  if (address.length !== 56) return false
  return /^[A-Z2-7]+$/.test(address)
}

export function xlmToStroops(xlm) {
  return Math.round(parseFloat(xlm) * 10_000_000)
}

export function stroopsToXlm(stroops) {
  return (parseInt(stroops) / 10_000_000).toFixed(7)
}

export function getExplorerUrl(type, id) {
  const base = 'https://stellar.expert/explorer/testnet'
  if (type === 'tx') return `${base}/tx/${id}`
  if (type === 'account') return `${base}/account/${id}`
  if (type === 'contract') return `${base}/contract/${id}`
  return base
}