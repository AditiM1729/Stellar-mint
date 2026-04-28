import { useState, useCallback } from 'react'
import { isConnected, isAllowed, requestAccess, getAddress } from '@stellar/freighter-api'

export function useWallet() {
  const [address, setAddress]           = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError]               = useState(null)

  const connect = useCallback(async () => {
    setIsConnecting(true)
    setError(null)
    try {
      const connected = await isConnected()
      if (!connected) {
        throw Object.assign(
          new Error('Freighter not installed. Get it at freighter.app'),
          { type: 'NOT_FOUND' }
        )
      }
      const result = await requestAccess()
      if (result.error) {
        throw Object.assign(
          new Error('Connection rejected. Please approve in Freighter.'),
          { type: 'REJECTED' }
        )
      }
      const publicKey = result.address
      if (!publicKey) {
        throw Object.assign(
          new Error('Could not get wallet address.'),
          { type: 'REJECTED' }
        )
      }
      setAddress(publicKey)
    } catch (err) {
      const msg = err?.message || ''
      if (err.type === 'NOT_FOUND' || msg.includes('not installed')) {
        setError({ type: 'NOT_FOUND', message: 'Freighter not installed. Get it at freighter.app' })
      } else if (err.type === 'REJECTED' || msg.includes('reject') || msg.includes('denied')) {
        setError({ type: 'REJECTED', message: 'Connection rejected. Please try again.' })
      } else {
        setError({ type: 'UNKNOWN', message: msg || 'Failed to connect.' })
      }
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setAddress('')
    setError(null)
  }, [])

  return { address, isConnecting, error, connect, disconnect }
}