import { describe, it, expect } from 'vitest'
import { shortAddress, isValidAddress, xlmToStroops, stroopsToXlm, getExplorerUrl } from '../utils/stellar'

describe('Stellar Utils', () => {
  it('should shorten a stellar address', () => {
    const addr = 'GAWOCI3JKKRFYYUJGOR7I3LZM6BMFCLUBN3EXBNLRISO6XWW3YDSTHDU'
    expect(shortAddress(addr)).toBe('GAWOCI...DSTHDU')
  })

  it('should validate a correct stellar address', () => {
    expect(isValidAddress('GAWOCI3JKKRFYYUJGOR7I3LZM6BMFCLUBN3EXBNLRISO6XWW3YDSTHDU')).toBe(true)
  })

  it('should reject invalid stellar addresses', () => {
    expect(isValidAddress('')).toBe(false)
    expect(isValidAddress(null)).toBe(false)
    expect(isValidAddress('notanaddress')).toBe(false)
    expect(isValidAddress('XAWOCI3JKKRFYYUJGOR7I3LZM6BMFCLUBN3EXBNLRISO6XWW3YDSTHDU')).toBe(false)
  })

  it('should convert XLM to stroops', () => {
    expect(xlmToStroops(1)).toBe(10_000_000)
    expect(xlmToStroops(100)).toBe(1_000_000_000)
  })

  it('should convert stroops to XLM', () => {
    expect(stroopsToXlm(10_000_000)).toBe('1.0000000')
  })

  it('should build correct explorer URLs', () => {
    expect(getExplorerUrl('tx', 'abc123')).toBe('https://stellar.expert/explorer/testnet/tx/abc123')
    expect(getExplorerUrl('contract', 'CXXX')).toBe('https://stellar.expert/explorer/testnet/contract/CXXX')
  })
})