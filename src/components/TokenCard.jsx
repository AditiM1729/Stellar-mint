import { useState } from 'react'
import { formatSupply, isValidAmount } from '../utils/format'
import { shortAddress, getExplorerUrl } from '../utils/stellar'
import { timeAgo } from '../utils/format'

export function TokenCard({ token, onMint, isLoading }) {
  const [mintAmount, setMintAmount] = useState('')
  const [showMint, setShowMint]     = useState(false)
  const [error, setError]           = useState('')

  const handleMint = () => {
    if (!isValidAmount(mintAmount)) {
      setError('Enter a valid amount')
      return
    }
    setError('')
    onMint({ tokenId: token.id, amount: mintAmount })
    setMintAmount('')
    setShowMint(false)
  }

  return (
    <div style={{ background: '#0f0f1a', border: '1px solid #1e1e2e',
                  borderRadius: 16, padding: 20, transition: 'border-color 0.2s' }}
         onMouseEnter={e => e.currentTarget.style.borderColor = '#6366f1'}
         onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e2e'}>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center
                          font-black text-white text-xs flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            {token.symbol.slice(0, 2)}
          </div>
          <div>
            <h3 style={{ color: 'white', fontSize: 15, fontWeight: 800,
                         margin: 0, letterSpacing: '-0.02em' }}>
              {token.name}
            </h3>
            <span style={{ color: '#6366f1', fontSize: 12,
                           fontWeight: 700 }}>
              {token.symbol}
            </span>
          </div>
        </div>
        <span style={{ color: '#6b7280', fontSize: 11,
                       fontFamily: 'monospace' }}>
          {timeAgo(token.createdAt)}
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: 'Supply',   value: formatSupply(token.supply) },
          { label: 'Decimals', value: token.decimals },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: '#1a1a2e',
                                    borderRadius: 10, padding: '8px 12px' }}>
            <p style={{ color: '#6b7280', fontSize: 10, margin: '0 0 2px',
                        textTransform: 'uppercase', letterSpacing: '.06em' }}>
              {label}
            </p>
            <p style={{ color: 'white', fontSize: 14, fontWeight: 700,
                        margin: 0, fontFamily: 'monospace' }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Contract addresses */}
      <div style={{ background: '#1a1a2e', borderRadius: 10,
                    padding: '10px 12px', marginBottom: 14 }}>
        <p style={{ color: '#6b7280', fontSize: 10, margin: '0 0 4px',
                    textTransform: 'uppercase', letterSpacing: '.06em' }}>
          Token Contract
        </p>
        <div className="flex items-center justify-between gap-2">
          <code style={{ color: '#a5b4fc', fontSize: 11,
                         wordBreak: 'break-all' }}>
            {shortAddress(token.tokenContract)}
          </code>
          <a href={getExplorerUrl('contract', token.tokenContract)}
             target="_blank" rel="noopener noreferrer"
             style={{ color: '#6366f1', fontSize: 11,
                      textDecoration: 'none', flexShrink: 0 }}>
            View →
          </a>
        </div>
        <p style={{ color: '#6b7280', fontSize: 10,
                    margin: '6px 0 4px',
                    textTransform: 'uppercase', letterSpacing: '.06em' }}>
          Factory Contract (Inter-contract call)
        </p>
        <code style={{ color: '#a5b4fc', fontSize: 11,
                       wordBreak: 'break-all' }}>
          {shortAddress(token.factoryContract)}
        </code>
      </div>

      {/* TX Hash */}
      <div className="flex items-center justify-between mb-4">
        <span style={{ color: '#6b7280', fontSize: 11 }}>TX Hash</span>
        <a href={getExplorerUrl('tx', token.txHash)}
           target="_blank" rel="noopener noreferrer"
           style={{ color: '#6366f1', fontSize: 11,
                    fontFamily: 'monospace', textDecoration: 'none' }}>
          {token.txHash.slice(0, 16)}…
        </a>
      </div>

      {/* Mint more */}
      {!showMint ? (
        <button onClick={() => setShowMint(true)}
                disabled={isLoading}
                style={{
                  width: '100%', background: 'transparent',
                  border: '1px solid #2a2a3a', borderRadius: 10,
                  padding: '9px', color: '#6366f1', fontSize: 13,
                  fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.2s', fontFamily: 'inherit',
                }}
                onMouseEnter={e => {
                  e.target.style.background = '#1a1a2e'
                  e.target.style.borderColor = '#6366f1'
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'transparent'
                  e.target.style.borderColor = '#2a2a3a'
                }}>
          + Mint More
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <input type="number" placeholder="Amount to mint"
                   value={mintAmount}
                   onChange={e => { setMintAmount(e.target.value); setError('') }}
                   style={{
                     width: '100%', background: '#0a0a0f',
                     border: `1px solid ${error ? '#f87171' : '#2a2a3a'}`,
                     borderRadius: 10, padding: '9px 12px',
                     color: 'white', fontSize: 13, outline: 'none',
                     boxSizing: 'border-box', fontFamily: 'inherit',
                   }} />
            {error && <p style={{ color: '#f87171', fontSize: 11,
                                  marginTop: 3 }}>{error}</p>}
          </div>
          <button onClick={handleMint} disabled={isLoading}
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none', borderRadius: 10, padding: '9px 14px',
                    color: 'white', fontSize: 13, fontWeight: 700,
                    cursor: isLoading ? 'wait' : 'pointer',
                    fontFamily: 'inherit', flexShrink: 0,
                  }}>
            {isLoading ? '…' : 'Mint'}
          </button>
          <button onClick={() => { setShowMint(false); setError('') }}
                  style={{
                    background: 'transparent', border: '1px solid #2a2a3a',
                    borderRadius: 10, padding: '9px 12px', color: '#6b7280',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                    flexShrink: 0,
                  }}>
            ✕
          </button>
        </div>
      )}
    </div>
  )
}