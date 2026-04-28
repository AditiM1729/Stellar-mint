import { getExplorerUrl } from '../utils/stellar'

export function TxStatus({ txStatus, onClose }) {
  if (txStatus.status === 'idle') return null

  const configs = {
    pending: {
      bg: 'rgba(99,102,241,0.08)',
      border: 'rgba(99,102,241,0.3)',
      titleColor: '#a5b4fc',
      title: 'Transaction Pending',
    },
    success: {
      bg: 'rgba(74,222,128,0.08)',
      border: 'rgba(74,222,128,0.3)',
      titleColor: '#4ade80',
      title: txStatus.token ? '🎉 Token Deployed!' : '✓ Success!',
    },
    error: {
      bg: 'rgba(248,113,113,0.08)',
      border: 'rgba(248,113,113,0.3)',
      titleColor: '#f87171',
      title: '✗ Failed',
    },
  }

  const c = configs[txStatus.status]
  if (!c) return null

  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 14, padding: '16px 18px', marginBottom: 16,
      animation: 'slideUp 0.3s ease',
    }}>
      <div className="flex items-start justify-between gap-3">
        <div style={{ flex: 1 }}>

          {/* Pending */}
          {txStatus.status === 'pending' && (
            <div className="flex items-center gap-3">
              <div style={{
                width: 16, height: 16, borderRadius: '50%',
                border: '2px solid rgba(99,102,241,0.3)',
                borderTopColor: '#6366f1', flexShrink: 0,
                animation: 'spin 0.7s linear infinite',
              }} />
              <div>
                <p style={{ color: c.titleColor, fontWeight: 700,
                            fontSize: 13, margin: '0 0 2px' }}>
                  {c.title}
                </p>
                <p style={{ color: '#6b7280', fontSize: 12, margin: 0 }}>
                  Confirming on Stellar Testnet…
                </p>
              </div>
            </div>
          )}

          {/* Success */}
          {txStatus.status === 'success' && (
            <div>
              <p style={{ color: c.titleColor, fontWeight: 700,
                          fontSize: 13, margin: '0 0 8px' }}>
                {c.title}
              </p>
              {txStatus.token && (
                <div style={{ marginBottom: 8 }}>
                  <p style={{ color: '#6b7280', fontSize: 11,
                              margin: '0 0 2px' }}>Token Created</p>
                  <p style={{ color: 'white', fontSize: 13,
                              fontWeight: 700, margin: 0 }}>
                    <span style={{ color: '#6366f1' }}>
                      {txStatus.token.symbol}
                    </span>
                    {' — '}{txStatus.token.name}
                  </p>
                </div>
              )}
              {txStatus.hash && (
                <div>
                  <p style={{ color: '#6b7280', fontSize: 11,
                              margin: '0 0 2px' }}>TX Hash</p>
                  <p style={{ color: '#a5b4fc', fontSize: 11,
                              fontFamily: 'monospace',
                              wordBreak: 'break-all', margin: '0 0 6px' }}>
                    {txStatus.hash}
                  </p>
                  <a href={getExplorerUrl('tx', txStatus.hash)}
                     target="_blank" rel="noopener noreferrer"
                     style={{ color: '#6366f1', fontSize: 12,
                              textDecoration: 'none', fontWeight: 600 }}>
                    View on Stellar Expert →
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {txStatus.status === 'error' && (
            <div>
              <p style={{ color: c.titleColor, fontWeight: 700,
                          fontSize: 13, margin: '0 0 4px' }}>
                {c.title}
              </p>
              <p style={{ color: '#fca5a5', fontSize: 12, margin: 0 }}>
                {txStatus.error}
              </p>
            </div>
          )}
        </div>

        {/* Close button */}
        {txStatus.status !== 'pending' && (
          <button onClick={onClose}
                  style={{ background: 'none', border: 'none',
                           color: '#6b7280', cursor: 'pointer',
                           fontSize: 18, padding: 0, lineHeight: 1,
                           flexShrink: 0 }}>
            ×
          </button>
        )}
      </div>
    </div>
  )
}