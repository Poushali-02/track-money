import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import BACKEND_URL from '../config/api'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const GoogleAuth = () => {
  const [token, setToken] = useState(null)
  const [copied, setCopied] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
          method: 'GET',
          credentials: 'include',
        })
        if (response.ok) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Auth check error:', error)
      } finally {
        setAuthChecking(false)
      }
    }
    checkAuth()
  }, [])

  const handleSuccess = (response) => {
    const idToken = response.credential
    setIsLoading(true)
    
    // Send Google token to backend to create session
    fetch(`${BACKEND_URL}/api/auth/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token: idToken }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.result.status === 'success') {
          sessionStorage.setItem('googleToken', idToken)
          sessionStorage.setItem('userName', data.result.data.username)
          setTimeout(() => {
            navigate('/profile')
          }, 1000)
        } else {
          setIsLoading(false)
          alert('Login failed: ' + data.result.message)
        }
      })
      .catch(err => {
        console.error('Backend session creation failed:', err)
        setIsLoading(false)
        alert('Login failed. Please try again.')
      })
  }

  const handleError = () => {
    console.error('Google Login Error')
    console.error('VITE_GOOGLE_CLIENT_ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID)
    alert('Google login failed. Please check browser console for details.')
  }

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

  const getMaskedToken = () => {
    if (!token) return ''
    if (token.length <= 30) return '•'.repeat(token.length)
    return `${token.slice(0, 10)}${'•'.repeat(20)}${token.slice(-10)}`
  }

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="mb-16">
        <h2 className="text-white/90 text-xl font-semibold mb-4">Quick Authentication</h2>
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
          <p className="text-white/70 text-center">
            Google Authentication is not configured. Please set VITE_GOOGLE_CLIENT_ID environment variable.
          </p>
        </div>
      </div>
    )
  }

  if (authChecking) {
    return null
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="mb-16">
      <h2 className="text-white/90 text-xl font-semibold mb-4">Quick Authentication</h2>
      
      <div className="bg-white/3 border border-white/8 rounded-2xl p-8">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <p className="text-white/70 text-center">Setting up your account...</p>
          </div>
        ) : !token ? (
          <>
            <p className="text-white/70 text-center mb-6">
              Sign in with Google to get your authentication token for Claude
            </p>
            <div className="flex justify-center">
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
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-white/90 font-medium">Your token is ready! Copy and paste it to Claude:</p>
              <span className="text-white/60 text-sm">⏱ {timeLeft}s</span>
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4 flex items-center gap-2">
              <span className="text-yellow-400 text-lg">🔒</span>
              <span className="text-yellow-300/80 text-sm">Token auto-clears in {timeLeft}s for security. Don't share your screen.</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <textarea 
                value={showToken ? token : getMaskedToken()} 
                readOnly 
                className="w-full bg-transparent text-white/90 text-sm font-mono resize-none focus:outline-none"
                rows={3}
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={copyToken}
                className="flex-1 bg-white text-black px-4 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all"
              >
                {copied ? (
                  <>
                    <span className="mr-2">✓</span>
                    Copied!
                  </>
                ) : (
                  <>
                    <span className="mr-2">⎘</span>
                    Copy Token
                  </>
                )}
              </button>
              <button 
                onClick={() => setShowToken(!showToken)}
                className="flex-1 bg-white/5 border border-white/10 text-white/70 px-4 py-3 rounded-lg font-semibold hover:bg-white/8 transition-all"
              >
                {showToken ? '🙈 Hide' : '👁 Reveal'}
              </button>
              <button 
                onClick={() => { setToken(null); setShowToken(false); }}
                className="flex-1 bg-white/5 border border-white/10 text-white/70 px-4 py-3 rounded-lg font-semibold hover:bg-white/8 transition-all"
              >
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
