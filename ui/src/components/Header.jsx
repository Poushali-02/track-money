import { useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = sessionStorage.getItem('userName')

  const handleProfileClick = () => {
    navigate('/profile')
  }

  return (
    <header className="text-center py-40 px-8 relative max-w-4xl mx-auto h-24 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-4">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-black">₹</span>
        </div>
        <div>
          <h1 className="text-6xl font-bold text-white tracking-tight">Paisa Flow</h1>
          <p className="text-sm text-white/50 font-normal tracking-wide">Personal Finance Management for Claude Desktop</p>
        </div>
      </div>
      
      {location.pathname !== '/profile' && user && (
        <div className="absolute top-14 right-0">
          <button 
            onClick={handleProfileClick}
            title={user.username}
            className="bg-white/5 border border-white/15 text-white/70 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-white/10 hover:border-white/30 hover:text-white/90 transition-all"
          >
            <span className="text-lg">👤</span>
          </button>
        </div>
      )}
    </header>
  )
}

export default Header


