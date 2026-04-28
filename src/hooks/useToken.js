import { useState, useCallback } from 'react'
import { Horizon } from '@stellar/stellar-sdk'
import { setCache, getCache, clearCache } from '../utils/cache'
import { isValidAddress } from '../utils/stellar'
import { isValidTokenName, isValidTokenSymbol, isValidAmount } from '../utils/format'

const HORIZON_URL = 'https://horizon-testnet.stellar.org'

export function useToken(walletAddress) {
  const [txStatus, setTxStatus]   = useState({ status: 'idle' })
  const [isLoading, setIsLoading] = useState(false)
  const [tokens, setTokens]       = useState([])
  const [balance, setBalance]     = useState(null)

  const horizon = new Horizon.Server(HORIZON_URL)

  // ── Fetch balance with cache ─────────────────────────────────────────────
  const fetchBalance = useCallback(async () => {
    if (!walletAddress) return null
    const cacheKey = `stellarmint_balance_${walletAddress}`
    const cached = getCache(cacheKey)
    if (cached !== null) {
      setBalance(cached)
      return cached
    }
    setIsLoading(true)
    try {
      const account = await horizon.loadAccount(walletAddress)
      const xlm = account.balances.find(b => b.asset_type === 'native')
      const bal = xlm ? parseFloat(xlm.balance).toFixed(4) : '0'
      setCache(cacheKey, bal)
      setBalance(bal)
      return bal
    } catch (e) {
      console.warn('fetchBalance:', e.message)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [walletAddress])

  // ── Create token (demo mode) ─────────────────────────────────────────────
  const createToken = useCallback(async ({ name, symbol, supply, decimals }) => {
    if (!walletAddress) return

    if (!isValidTokenName(name)) {
      setTxStatus({ status: 'error', error: 'Invalid token name. Use 3-32 alphanumeric characters.' })
      return
    }
    if (!isValidTokenSymbol(symbol)) {
      setTxStatus({ status: 'error', error: 'Invalid symbol. Use 2-6 uppercase letters.' })
      return
    }
    if (!isValidAmount(supply)) {
      setTxStatus({ status: 'error', error: 'Supply must be greater than 0.' })
      return
    }

    setTxStatus({ status: 'pending' })
    setIsLoading(true)

    try {
      // Simulate contract deployment + inter-contract call
      await new Promise(r => setTimeout(r, 2500))

      // Generate fake contract addresses (factory + token)
      const fakeFactory = 'C' + Array.from({ length: 55 }, () =>
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'[Math.floor(Math.random() * 32)]
      ).join('')

      const fakeToken = 'C' + Array.from({ length: 55 }, () =>
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'[Math.floor(Math.random() * 32)]
      ).join('')

      const fakeTxHash = Array.from({ length: 64 }, () =>
        '0123456789abcdef'[Math.floor(Math.random() * 16)]
      ).join('')

      const newToken = {
        id: Date.now(),
        name,
        symbol,
        supply,
        decimals: decimals || 7,
        factoryContract: fakeFactory,
        tokenContract: fakeToken,
        txHash: fakeTxHash,
        createdAt: Date.now(),
        creator: walletAddress,
      }

      // Cache tokens list
      const existing = getCache(`stellarmint_tokens_${walletAddress}`) || []
      const updated = [newToken, ...existing]
      setCache(`stellarmint_tokens_${walletAddress}`, updated)
      setTokens(updated)

      clearCache(`stellarmint_balance_${walletAddress}`)
      setTxStatus({ status: 'success', hash: fakeTxHash, token: newToken })

    } catch (err) {
      setTxStatus({ status: 'error', error: err.message || 'Token creation failed.' })
    } finally {
      setIsLoading(false)
    }
  }, [walletAddress])

  // ── Mint more tokens ─────────────────────────────────────────────────────
  const mintTokens = useCallback(async ({ tokenId, amount }) => {
    if (!walletAddress) return
    if (!isValidAmount(amount)) {
      setTxStatus({ status: 'error', error: 'Invalid mint amount.' })
      return
    }

    setTxStatus({ status: 'pending' })
    setIsLoading(true)

    try {
      await new Promise(r => setTimeout(r, 1500))

      const fakeTxHash = Array.from({ length: 64 }, () =>
        '0123456789abcdef'[Math.floor(Math.random() * 16)]
      ).join('')

      // Update token supply in cache
      const existing = getCache(`stellarmint_tokens_${walletAddress}`) || []
      const updated = existing.map(t =>
        t.id === tokenId
          ? { ...t, supply: String(parseFloat(t.supply) + parseFloat(amount)) }
          : t
      )
      setCache(`stellarmint_tokens_${walletAddress}`, updated)
      setTokens(updated)
      setTxStatus({ status: 'success', hash: fakeTxHash })

    } catch (err) {
      setTxStatus({ status: 'error', error: err.message || 'Mint failed.' })
    } finally {
      setIsLoading(false)
    }
  }, [walletAddress])

  // ── Load cached tokens ───────────────────────────────────────────────────
  const loadTokens = useCallback(() => {
    if (!walletAddress) return
    const cached = getCache(`stellarmint_tokens_${walletAddress}`) || []
    setTokens(cached)
  }, [walletAddress])

  const clearTxStatus = useCallback(() => setTxStatus({ status: 'idle' }), [])

  return {
    txStatus, isLoading, tokens, balance,
    fetchBalance, createToken, mintTokens,
    loadTokens, clearTxStatus,
  }
}