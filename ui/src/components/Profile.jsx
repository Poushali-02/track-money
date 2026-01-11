import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import BACKEND_URL from '../config/api'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editUsername, setEditUsername] = useState('')
  const [editFullName, setEditFullName] = useState('')
  const [editMessage, setEditMessage] = useState('')
  const [editLoading, setEditLoading] = useState(false)
  
  const [showVerifyForm, setShowVerifyForm] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [verifyMessage, setVerifyMessage] = useState('')
  const [verifyLoading, setVerifyLoading] = useState(false)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)

  const [logoutModalOpen, setLogoutModalOpen] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [logoutMessage, setLogoutMessage] = useState('')
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState('')

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
          method: 'GET',
          credentials: 'include',
        })
        const data = await response.json()
        if (data.result.status === 'success') {
          setUser(data.result.user)
          setEditUsername(data.result.user.username)
          setEditFullName(data.result.user.fullName || '')
        }
      } catch (error) {
        console.error('Error fetching user info:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserInfo()
  }, [])

  const handleSendVerification = async (e) => {
    e.preventDefault()
    setVerifyLoading(true)
    setVerifyMessage('')

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/send-verification-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      const data = await response.json()
      setVerifyMessage(data.result.message)
    } catch (error) {
      setVerifyMessage('Error sending verification code')
    } finally {
      setVerifyLoading(false)
    }
  }

  const handleEditProfile = async (e) => {
    e.preventDefault()
    setEditLoading(true)
    setEditMessage('')

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/edit-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: editUsername, fullName: editFullName }),
      })
      const data = await response.json()
      setEditMessage(data.result.message)
      if (data.result.status === 'success') {
        setUser({
          ...user,
          username: editUsername,
          fullName: editFullName,
        })
        setIsEditMode(false)
      }
    } catch (error) {
      setEditMessage('Error updating profile')
    } finally {
      setEditLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditUsername(user.username)
    setEditFullName(user.fullName || '')
    setIsEditMode(false)
    setEditMessage('')
  }

  const handleVerifyEmail = async (e) => {
    e.preventDefault()
    setVerifyLoading(true)
    setVerifyMessage('')

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationCode }),
      })
      const data = await response.json()
      setVerifyMessage(data.result.message)
      if (data.result.status === 'success') {
        setVerificationCode('')
        setShowVerifyForm(false)
      }
    } catch (error) {
      setVerifyMessage('Error verifying email')
    } finally {
      setVerifyLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPasswordLoading(true)
    setPasswordMessage('')

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ oldPassword, newPassword }),
      })
      const data = await response.json()
      setPasswordMessage(data.result.message)
      if (data.result.status === 'success') {
        setOldPassword('')
        setNewPassword('')
        setShowPasswordForm(false)
      }
    } catch (error) {
      setPasswordMessage('Error changing password')
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleOpenClaude = () => {
    const token = sessionStorage.getItem('googleToken')
    if (token) {
      navigator.clipboard.writeText(token)
      alert('Token copied to clipboard! Paste it in Claude Desktop.')
    }
  }

  const handleLogout = async () => {
    setLogoutLoading(true)
    setLogoutMessage('')
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      setLogoutMessage('Logout successful')
      sessionStorage.removeItem('googleToken')
      sessionStorage.removeItem('userName')
      setTimeout(() => {
        setLogoutModalOpen(false)
        navigate('/')
      }, 1000)
    } catch (error) {
      console.error('Logout error:', error)
      setLogoutMessage('Error logging out')
    } finally {
      setLogoutLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setDeleteLoading(true)
    setDeleteMessage('')

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/delete-account`, {
        method: 'POST',
        credentials: 'include',
      })
      const data = await response.json()
      if (data.result.status === 'success') {
        sessionStorage.removeItem('googleToken')
        sessionStorage.removeItem('userName')
        setDeleteModalOpen(false)
        alert('Account deleted successfully')
        navigate('/')
      } else {
        setDeleteMessage(data.result.message || 'Error deleting account')
      }
    } catch (error) {
      console.error('Delete account error:', error)
      setDeleteMessage('Error deleting account')
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-12">
      <button 
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 px-6 py-3 rounded-xl hover:bg-white/10 hover:border-white/20 hover:text-white/90 transition-all mb-8 font-medium"
      >
        ← Back
      </button>
      
      <div className="bg-white/3 border border-white/8 rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-tight">User Profile</h1>
        
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <span className="ml-4 text-white/70">Loading profile...</span>
          </div>
        )}
        
        {!loading && user && (
        <div>
        {/* User Information Section */}
        {user && (
          <div className="mb-8 pb-8 border-b border-white/5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white/90">👤 Account Information</h2>
              {!isEditMode && (
                <button 
                  onClick={() => setIsEditMode(true)}
                  className="text-sm bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  ✏️ Edit
                </button>
              )}
            </div>
            
            {!isEditMode ? (
              <div className="space-y-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Username:</span>
                  <span className="text-white font-medium">{user.username}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Full Name:</span>
                  <span className="text-white font-medium">{user.fullName || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Email:</span>
                  <span className="text-white font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Account Status:</span>
                  <span className={`font-medium ${user.email_verified ? 'text-green-400' : 'text-yellow-400'}`}>
                    {user.email_verified ? '✓ Verified' : '⚠ Unverified'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Member Since:</span>
                  <span className="text-white font-medium">{new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ) : (
              <form className="space-y-4 bg-white/5 rounded-lg p-4 border border-white/10" onSubmit={handleEditProfile}>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Username</label>
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:bg-white/15 focus:border-white/30"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:bg-white/15 focus:border-white/30"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit" 
                    disabled={editLoading}
                    className="flex-1 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-all disabled:opacity-60"
                  >
                    {editLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleCancelEdit}
                    className="flex-1 bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-lg font-semibold hover:bg-white/8 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            {editMessage && (
              <p className={`mt-4 px-4 py-3 rounded-lg text-sm animate-slideDown ${
                editMessage.includes('success') || editMessage.includes('Updated')
                  ? 'bg-green-500/10 text-green-300 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-300 border border-red-500/20'
              }`}>
                {editMessage}
              </p>
            )}
          </div>
        )}
        
        {/* Email Verification Section */}
        {user && !user.email_verified && (
        <div className="mb-8 pb-8 border-b border-white/5 last:border-0 last:mb-0 last:pb-0">
          
          {!showVerifyForm ? (
            <>
          <h2 className="text-lg font-semibold text-white/90 mb-4">📧 Email Verification</h2>
            <button 
              onClick={handleSendVerification}
              className="w-full bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all active:translate-y-0"
            >
              Send Verification Code
            </button>
            </>
          ) : (
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength="6"
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:bg-white/8 focus:border-white/20"
              />
              <div className="flex gap-3">
                <button 
                  type="submit" 
                  onClick={handleVerifyEmail}
                  disabled={verifyLoading}
                  className="flex-1 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all disabled:opacity-60"
                >
                  {verifyLoading ? 'Verifying...' : 'Verify Email'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowVerifyForm(false)}
                  className="flex-1 bg-white/5 border border-white/10 text-white/70 px-6 py-3 rounded-lg font-semibold hover:bg-white/8 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          {verifyMessage && (
            <p className={`mt-4 px-4 py-3 rounded-lg text-sm animate-slideDown ${
              verifyMessage.includes('success') 
                ? 'bg-green-500/10 text-green-300 border border-green-500/20' 
                : 'bg-red-500/10 text-red-300 border border-red-500/20'
            }`}>
              {verifyMessage}
            </p>
          )}
        </div>
        )}

        {/* Change Password Section */}
        <div className="mb-8 pb-8 border-b border-white/5 last:border-0 last:mb-0 last:pb-0">
          <h2 className="text-lg font-semibold text-white/90 mb-4">🔐 Change Password</h2>
          
          {!showPasswordForm ? (
            <button 
              onClick={() => setShowPasswordForm(true)}
              className="w-full bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all"
            >
              Change Password
            </button>
          ) : (
            <form className="space-y-4" onSubmit={handleChangePassword}>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:bg-white/8 focus:border-white/20"
                required
              />
              <input
                type="password"
                placeholder="New Password (8+ chars, uppercase, lowercase, digit)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:bg-white/8 focus:border-white/20"
                required
              />
              <div className="flex gap-3">
                <button 
                  type="submit" 
                  disabled={passwordLoading}
                  className="flex-1 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all disabled:opacity-60"
                >
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowPasswordForm(false)}
                  className="flex-1 bg-white/5 border border-white/10 text-white/70 px-6 py-3 rounded-lg font-semibold hover:bg-white/8 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          {passwordMessage && (
            <p className={`mt-4 px-4 py-3 rounded-lg text-sm animate-slideDown ${
              passwordMessage.includes('success') 
                ? 'bg-green-500/10 text-green-300 border border-green-500/20' 
                : 'bg-red-500/10 text-red-300 border border-red-500/20'
            }`}>
              {passwordMessage}
            </p>
          )}
        </div>

        {/* Open Claude Section */}
        <div className="mb-8 pb-8 border-b border-white/5 last:border-0 last:mb-0 last:pb-0">
          <h2 className="text-lg font-semibold text-white/90 mb-4">🤖 Claude Desktop</h2>
          <button 
            onClick={handleOpenClaude}
            className="w-full bg-emerald-500/90 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-all"
          >
            📋 Copy Token for Claude
          </button>
          <p className="text-sm text-white/50 mt-2 text-center">Click to copy your authentication token to clipboard</p>
        </div>

        {/* Logout & Delete Account */}
        <div className="space-y-3">
          <button 
            onClick={() => setLogoutModalOpen(true)}
            className="w-full bg-white/5 border border-yellow-500/30 text-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all"
          >
            🚪 Logout
          </button>
          <button 
            onClick={() => setDeleteModalOpen(true)}
            className="w-full bg-white/5 border border-red-500/50 text-red-400 px-6 py-3 rounded-lg font-semibold hover:bg-red-500/20 hover:border-red-500/70 transition-all"
          >
            🗑️ Delete Account
          </button>
        </div>
        </div>
        )}

        {/* Logout Confirmation Modal */}
        <Modal
          isOpen={logoutModalOpen}
          title="Logout?"
          message="Are you sure you want to logout? You'll need to log in again to access your account."
          confirmText={logoutLoading ? 'Logging out...' : 'Logout'}
          cancelText="Cancel"
          onConfirm={handleLogout}
          onCancel={() => setLogoutModalOpen(false)}
          statusMessage={logoutMessage}
          isLoading={logoutLoading}
        />

        {/* Delete Account Confirmation Modal */}
        <Modal
          isOpen={deleteModalOpen}
          title="Delete Account?"
          message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
          confirmText={deleteLoading ? 'Deleting...' : 'Delete Account'}
          cancelText="Cancel"
          onConfirm={handleDeleteAccount}
          onCancel={() => {
            setDeleteModalOpen(false)
            setDeleteMessage('')
          }}
          isDangerous={true}
          statusMessage={deleteMessage}
          isLoading={deleteLoading}
        />
      </div>
    </div>
  )
}

export default Profile

