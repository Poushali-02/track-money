import { useState, useEffect } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const GoogleAuth = () => {
  const [token, setToken] = useState(null)
  const [copied, setCopied] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60) // Token display expires in 60 seconds

  const handleSuccess = (response) => {
    const idToken = response.credential
    setToken(idToken)
    setTimeLeft(60)
  }

  const handleError = () => {
    console.log('Login Failed')
  }

  // Auto-clear token after 60 seconds for security
  useEffect(() => {
    if (token && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setToken(null)
      setShowToken(false)
    }
  }, [token, timeLeft])

  const copyToken = () => {
    navigator.clipboard.writeText(token)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Mask the token, showing only first and last 10 characters
  const getMaskedToken = () => {
    if (!token) return ''
    if (token.length <= 30) return '•'.repeat(token.length)
    return `${token.slice(0, 10)}${'•'.repeat(20)}${token.slice(-10)}`
  }

  // Don't render if no client ID is configured
  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="auth-section">
        <h2 className="section-title">Quick Authentication</h2>
        <div className="auth-content">
          <p className="auth-description">
            Google Authentication is not configured. Please set VITE_GOOGLE_CLIENT_ID environment variable.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-section">
      <h2 className="section-title">Quick Authentication</h2>
      
      <div className="auth-content">
        {!token ? (
          <>
            <p className="auth-description">
              Sign in with Google to get your authentication token for Claude
            </p>
            <div className="google-btn-wrapper">
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleError}
                  text="continue_with"
                  shape="rectangular"
                  theme="filled_black"
                />
              </GoogleOAuthProvider>
            </div>
          </>
        ) : (
          <div className="token-display">
            <div className="token-header">
              <p className="token-label">Your token is ready! Copy and paste it to Claude:</p>
              <span className="token-timer">⏱ {timeLeft}s</span>
            </div>
            
            <div className="token-security-notice">
              <span className="security-icon">🔒</span>
              <span>Token auto-clears in {timeLeft}s for security. Don't share your screen.</span>
            </div>

            <div className="token-box">
              <textarea 
                value={showToken ? token : getMaskedToken()} 
                readOnly 
                className="token-textarea"
                rows={3}
              />
            </div>
            
            <div className="token-actions">
              <button className="copy-token-btn" onClick={copyToken}>
                {copied ? (
                  <>
                    <span className="btn-icon">✓</span>
                    Copied!
                  </>
                ) : (
                  <>
                    <span className="btn-icon">⎘</span>
                    Copy Token
                  </>
                )}
              </button>
              <button 
                className="reveal-btn" 
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? '🙈 Hide' : '👁 Reveal'}
              </button>
              <button className="reset-btn" onClick={() => { setToken(null); setShowToken(false); }}>
                Sign in Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GoogleAuth
