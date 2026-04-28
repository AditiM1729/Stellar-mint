import { useState, useEffect } from 'react'
import { shortAddress } from '../utils/stellar'

export function WalletBar({ address, isConnecting, error, onConnect, onDisconnect, balance, onRefreshBalance }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <nav style={{ background: '#0a0a0f', borderBottom: '1px solid #1e1e2e' }}
         className="px-4 md:px-8 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">

        {/* Brand */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center
                          font-black text-white text-xs flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            SM
          </div>
          <span className="font-black text-white text-base md:text-lg tracking-tight">
            StellarMint
          </span>
          <span className="hidden sm:block text-xs font-mono px-2 py-0.5 rounded-full"
                style={{ background: '#1a1a2e', color: '#6366f1',
                         border: '1px solid #2a2a3a' }}>
            TESTNET
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-3">
          {address ? (
            <>
              {/* Balance — hidden on very small screens */}
              <div className="hidden sm:block text-right">
                <div className="text-white font-bold text-sm">
                  {balance ?? '...'} XLM
                </div>
                <button onClick={onRefreshBalance}
                        className="text-xs cursor-pointer"
                        style={{ color: '#6366f1', background: 'none',
                                 border: 'none' }}>
                  refresh
                </button>
              </div>

              {/* Address */}
              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2
                              rounded-xl"
                   style={{ background: '#1a1a2e', border: '1px solid #2a2a3a' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                <span className="font-mono text-white text-xs">
                  {shortAddress(address)}
                </span>
                <button onClick={copy}
                        style={{ background: 'none', border: 'none',
                                 color: '#6b7280', cursor: 'pointer',
                                 fontSize: 12 }}>
                  {copied ? '✓' : '⎘'}
                </button>
              </div>

              {/* Disconnect */}
              <button onClick={onDisconnect}
                      className="text-xs px-2 md:px-3 py-2 rounded-xl
                                 cursor-pointer transition-all"
                      style={{ background: 'transparent',
                               border: '1px solid #2a2a3a',
                               color: '#6b7280' }}
                      onMouseEnter={e => {
                        e.target.style.borderColor = '#f87171'
                        e.target.style.color = '#f87171'
                      }}
                      onMouseLeave={e => {
                        e.target.style.borderColor = '#2a2a3a'
                        e.target.style.color = '#6b7280'
                      }}>
                Disconnect
              </button>
            </>
          ) : (
            <button onClick={onConnect} disabled={isConnecting}
                    className="px-4 md:px-5 py-2 rounded-xl text-white
                               font-bold text-sm cursor-pointer border-none
                               transition-opacity"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                             opacity: isConnecting ? 0.7 : 1 }}>
              {isConnecting ? 'Connecting…' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-6xl mx-auto mt-2 px-3 py-2 rounded-xl text-xs md:text-sm"
             style={{ background: 'rgba(248,113,113,0.08)',
                      border: '1px solid rgba(248,113,113,0.3)' }}>
          <span style={{ color: '#f87171' }}>⚠ </span>
          <span style={{ color: '#fca5a5' }}>{error.message}</span>
        </div>
      )}
    </nav>
  )
}