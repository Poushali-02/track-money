import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header, Features, RemoteSetup, LocalInstall, GoogleAuth, UsageGuide, MediaSection, Profile } from './components'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={
          <div className="max-w-4xl mx-auto px-8 py-12 min-h-screen">
            <Features />
            <GoogleAuth />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <RemoteSetup />
              <LocalInstall />
            </div>
            <UsageGuide />
            <MediaSection />
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App


