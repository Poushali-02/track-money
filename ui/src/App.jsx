import './App.css'
import { Header, Features, RemoteSetup, LocalInstall, GoogleAuth, UsageGuide, MediaSection } from './components'

function App() {
  return (
    <div className="app-container">
      <Header />
      <Features />

      <GoogleAuth />
      <div className="main-content">
        <RemoteSetup />
        <LocalInstall />
      </div>

      <UsageGuide />
      <MediaSection />

      {/* Decorative circles */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
    </div>
  )
}

export default App
