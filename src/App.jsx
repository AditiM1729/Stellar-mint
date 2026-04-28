// StellarMint — Token Launchpad on Stellar Testnet

import { useEffect } from 'react'
import { useWallet } from './hooks/useWallet'
import { useToken } from './hooks/useToken'
import { WalletBar } from './components/WalletBar'
import { MintForm } from './components/MintForm'
import { TokenCard } from './components/TokenCard'
import { TxStatus } from './components/TxStatus'

export default function App() {
  const {
    address, isConnecting, error,
    connect, disconnect,
  } = useWallet()

  const {
    txStatus, isLoading, tokens, balance,
    fetchBalance, createToken, mintTokens,
    loadTokens, clearTxStatus,
  } = useToken(address)

  useEffect(() => {
    if (address) {
      fetchBalance()
      loadTokens()
    }
  }, [address])

  return (
    <div style={{ minHeight: '100vh', background: '#07070f', color: 'white' }}>

      {/* Navbar */}
      <WalletBar
        address={address}
        isConnecting={isConnecting}
        error={error}
        onConnect={connect}
        onDisconnect={disconnect}
        balance={balance}
        onRefreshBalance={fetchBalance}
      />

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '40px 16px 28px' }}>
        <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700,
                      color: '#6366f1', textTransform: 'uppercase',
                      letterSpacing: '.14em', fontFamily: 'monospace',
                      marginBottom: 12, background: 'rgba(99,102,241,0.1)',
                      padding: '4px 12px', borderRadius: 99,
                      border: '1px solid rgba(99,102,241,0.2)' }}>
          Soroban · Custom Tokens · Inter-contract Calls
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900,
                     color: 'white', margin: '0 0 12px',
                     letterSpacing: '-0.04em', lineHeight: 1.1 }}>
          Token Launchpad
        </h1>
        <p style={{ color: '#6b7280', fontSize: 'clamp(13px, 2vw, 16px)',
                    margin: 0, lineHeight: 1.6, maxWidth: 480,
                    marginLeft: 'auto', marginRight: 'auto' }}>
          Deploy custom SEP-41 tokens on Stellar Testnet using
          Soroban smart contracts with inter-contract factory calls
        </p>
      </div>

      {/* Stats bar */}
      <div style={{ maxWidth: 900, margin: '0 auto 32px',
                    padding: '0 16px' }}>
        <div style={{ background: '#0f0f1a', border: '1px solid #1e1e2e',
                      borderRadius: 14, padding: '14px 20px',
                      display: 'flex', gap: 24, flexWrap: 'wrap',
                      justifyContent: 'center' }}>
          {[
            { label: 'Tokens Created', value: tokens.length },
            { label: 'Network',        value: 'Testnet' },
            { label: 'Standard',       value: 'SEP-41' },
            { label: 'Contract Type',  value: 'Soroban' },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ color: 'white', fontWeight: 800,
                            fontSize: 18, fontFamily: 'monospace' }}>
                {value}
              </div>
              <div style={{ color: '#6b7280', fontSize: 11,
                            textTransform: 'uppercase',
                            letterSpacing: '.06em' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main style={{ maxWidth: 900, margin: '0 auto',
                     padding: '0 16px 80px' }}>

        {/* TX Status */}
        <TxStatus txStatus={txStatus} onClose={clearTxStatus} />

        <div style={{ display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                      gap: 20, alignItems: 'start' }}>

          {/* Mint Form */}
          <MintForm
            onSubmit={createToken}
            isLoading={isLoading}
            walletAddress={address}
          />

          {/* Token list */}
          <div>
            <h2 style={{ color: 'white', fontSize: 15, fontWeight: 800,
                         marginBottom: 14, letterSpacing: '-0.02em' }}>
              🏦 Your Tokens
              {tokens.length > 0 && (
                <span style={{ color: '#6366f1', fontSize: 12,
                               fontWeight: 600, marginLeft: 8 }}>
                  ({tokens.length})
                </span>
              )}
            </h2>

            {tokens.length === 0 ? (
              <div style={{ background: '#0f0f1a', border: '1px dashed #1e1e2e',
                            borderRadius: 16, padding: '40px 20px',
                            textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>🪙</div>
                <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>
                  No tokens yet
                </p>
                <p style={{ color: '#4b5563', fontSize: 12,
                            marginTop: 4 }}>
                  {address
                    ? 'Create your first token using the form'
                    : 'Connect your wallet to get started'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {tokens.map(token => (
                  <TokenCard
                    key={token.id}
                    token={token}
                    onMint={mintTokens}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e1e2e', padding: '16px',
                       textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 11, color: '#4b5563',
                    fontFamily: 'monospace' }}>
          Stellar Level 4 · Soroban · Inter-contract Calls · CI/CD · Mobile Responsive
          {' · '}
          <a href="https://github.com/AditiM1729/stellar-mint"
             target="_blank" rel="noopener noreferrer"
             style={{ color: '#6366f1', textDecoration: 'none' }}>
            GitHub
          </a>
        </p>
      </footer>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}