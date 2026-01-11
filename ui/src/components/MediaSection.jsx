const MediaSection = () => {
  return (
    <div className="mb-16">
      <h2 className="text-white/90 text-xl font-semibold mb-4 text-center">See It in Action</h2>
      <p className="text-white/70 mb-8 text-center">
        Watch the demo video and explore screenshots to see how Paisa Flow works
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Video Section */}
        <div>
          <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden mb-3">
            <div className="aspect-video bg-white/5 flex flex-col items-center justify-center relative">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mb-4 cursor-pointer hover:bg-white/20 transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" className="text-white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-white/90 font-medium">Demo Video Coming Soon</p>
              <span className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-white/90 text-sm">2:30</span>
            </div>
          </div>
          <p className="text-white/60 text-sm text-center">Complete walkthrough of Paisa Flow with Claude Desktop</p>
        </div>

        {/* Screenshots Grid */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Screenshots</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="bg-white/3 border border-white/8 rounded-lg p-6 flex flex-col items-center justify-center aspect-square mb-2 hover:bg-white/5 transition-all">
                <span className="text-3xl mb-2">📝</span>
                <span className="text-white/90 text-sm font-medium">Registration</span>
              </div>
              <p className="text-white/60 text-xs text-center">User registration in Claude</p>
            </div>
            <div>
              <div className="bg-white/3 border border-white/8 rounded-lg p-6 flex flex-col items-center justify-center aspect-square mb-2 hover:bg-white/5 transition-all">
                <span className="text-3xl mb-2">➕</span>
                <span className="text-white/90 text-sm font-medium">Add Transaction</span>
              </div>
              <p className="text-white/60 text-xs text-center">Adding expenses & income</p>
            </div>
            <div>
              <div className="bg-white/3 border border-white/8 rounded-lg p-6 flex flex-col items-center justify-center aspect-square mb-2 hover:bg-white/5 transition-all">
                <span className="text-3xl mb-2">📊</span>
                <span className="text-white/90 text-sm font-medium">Summary View</span>
              </div>
              <p className="text-white/60 text-xs text-center">Financial summary & analytics</p>
            </div>
            <div>
              <div className="bg-white/3 border border-white/8 rounded-lg p-6 flex flex-col items-center justify-center aspect-square mb-2 hover:bg-white/5 transition-all">
                <span className="text-3xl mb-2">📈</span>
                <span className="text-white/90 text-sm font-medium">Monthly Report</span>
              </div>
              <p className="text-white/60 text-xs text-center">Detailed monthly breakdown</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white/3 border border-white/8 rounded-lg p-4 text-center">
          <span className="text-white text-2xl font-bold block mb-1">25+</span>
          <span className="text-white/60 text-sm">Categories</span>
        </div>
        <div className="bg-white/3 border border-white/8 rounded-lg p-4 text-center">
          <span className="text-white text-2xl font-bold block mb-1">14</span>
          <span className="text-white/60 text-sm">MCP Tools</span>
        </div>
        <div className="bg-white/3 border border-white/8 rounded-lg p-4 text-center">
          <span className="text-white text-2xl font-bold block mb-1">24h</span>
          <span className="text-white/60 text-sm">Token Validity</span>
        </div>
        <div className="bg-white/3 border border-white/8 rounded-lg p-4 text-center">
          <span className="text-white text-2xl font-bold block mb-1">100%</span>
          <span className="text-white/60 text-sm">Secure</span>
        </div>
      </div>
    </div>
  )
}

export default MediaSection
