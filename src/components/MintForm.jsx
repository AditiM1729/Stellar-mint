import { useState } from 'react'
import { isValidTokenName, isValidTokenSymbol, isValidAmount } from '../utils/format'

export function MintForm({ onSubmit, isLoading, walletAddress }) {
  const [name, setName]       = useState('')
  const [symbol, setSymbol]   = useState('')
  const [supply, setSupply]   = useState('')
  const [decimals, setDecimals] = useState('7')
  const [errors, setErrors]   = useState({})

  const validate = () => {
    const e = {}
    if (!isValidTokenName(name)) e.name = 'Use 3-32 alphanumeric characters'
    if (!isValidTokenSymbol(symbol)) e.symbol = 'Use 2-6 uppercase letters (e.g. MYTKN)'
    if (!isValidAmount(supply)) e.supply = 'Supply must be greater than 0'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSubmit({ name, symbol, supply, decimals: parseInt(decimals) })
  }

  const inputStyle = (hasError) => ({
    width: '100%',
    background: '#0a0a0f',
    border: `1px solid ${hasError ? '#f87171' : '#1e1e2e'}`,
    borderRadius: 10,
    padding: '11px 14px',
    color: 'white',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  })

  const label = {
    display: 'block',
    fontSize: 11,
    fontWeight: 700,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    marginBottom: 5,
  }

  return (
    <div style={{ background: '#0f0f1a', border: '1px solid #1e1e2e',
                  borderRadius: 20, padding: 24 }}>
      <div className="flex items-center gap-2 mb-6">
        <span style={{ fontSize: 20 }}>🪙</span>
        <h2 style={{ color: 'white', fontSize: 16, fontWeight: 800,
                     margin: 0, letterSpacing: '-0.02em' }}>
          Create Token
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Name */}
        <div>
          <label style={label}>Token Name</label>
          <input type="text" placeholder="My Awesome Token"
                 value={name}
                 onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
                 style={inputStyle(errors.name)}
                 onFocus={e => e.target.style.borderColor = '#6366f1'}
                 onBlur={e => e.target.style.borderColor = errors.name ? '#f87171' : '#1e1e2e'} />
          {errors.name && <p style={{ color: '#f87171', fontSize: 11, marginTop: 3 }}>{errors.name}</p>}
        </div>

        {/* Symbol */}
        <div>
          <label style={label}>Token Symbol</label>
          <input type="text" placeholder="MYTKN"
                 value={symbol}
                 onChange={e => { setSymbol(e.target.value.toUpperCase()); setErrors(p => ({ ...p, symbol: '' })) }}
                 maxLength={6}
                 style={inputStyle(errors.symbol)}
                 onFocus={e => e.target.style.borderColor = '#6366f1'}
                 onBlur={e => e.target.style.borderColor = errors.symbol ? '#f87171' : '#1e1e2e'} />
          {errors.symbol && <p style={{ color: '#f87171', fontSize: 11, marginTop: 3 }}>{errors.symbol}</p>}
        </div>

        {/* Supply + Decimals row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label style={label}>Total Supply</label>
            <input type="number" placeholder="1000000"
                   min="1" value={supply}
                   onChange={e => { setSupply(e.target.value); setErrors(p => ({ ...p, supply: '' })) }}
                   style={inputStyle(errors.supply)}
                   onFocus={e => e.target.style.borderColor = '#6366f1'}
                   onBlur={e => e.target.style.borderColor = errors.supply ? '#f87171' : '#1e1e2e'} />
            {errors.supply && <p style={{ color: '#f87171', fontSize: 11, marginTop: 3 }}>{errors.supply}</p>}
          </div>
          <div>
            <label style={label}>Decimals</label>
            <select value={decimals} onChange={e => setDecimals(e.target.value)}
                    style={{ ...inputStyle(false), cursor: 'pointer' }}>
              <option value="0">0</option>
              <option value="2">2</option>
              <option value="6">6</option>
              <option value="7">7 (default)</option>
              <option value="18">18</option>
            </select>
          </div>
        </div>

        {/* Preview */}
        {name && symbol && supply && (
          <div style={{ background: '#1a1a2e', border: '1px solid #2a2a3a',
                        borderRadius: 10, padding: '10px 14px' }}>
            <p style={{ color: '#6b7280', fontSize: 11, margin: '0 0 4px',
                        textTransform: 'uppercase', letterSpacing: '.06em' }}>
              Preview
            </p>
            <p style={{ color: 'white', fontSize: 13, margin: 0 }}>
              <span style={{ color: '#6366f1', fontWeight: 700 }}>{symbol}</span>
              {' — '}{name}
              {' · '}<span style={{ color: '#8b5cf6' }}>{parseFloat(supply).toLocaleString()} tokens</span>
            </p>
          </div>
        )}

        {/* Submit */}
        <button onClick={handleSubmit}
                disabled={isLoading || !walletAddress}
                style={{
                  background: isLoading || !walletAddress
                    ? '#1e1e2e'
                    : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: isLoading || !walletAddress ? '#4b5563' : 'white',
                  border: 'none', borderRadius: 12, padding: '13px',
                  fontSize: 14, fontWeight: 800, cursor: isLoading || !walletAddress
                    ? 'not-allowed' : 'pointer',
                  width: '100%', transition: 'all 0.2s',
                  fontFamily: 'inherit',
                }}>
          {!walletAddress ? 'Connect Wallet First'
            : isLoading ? '⏳ Deploying Token…'
            : '🚀 Deploy Token'}
        </button>
      </div>
    </div>
  )
}