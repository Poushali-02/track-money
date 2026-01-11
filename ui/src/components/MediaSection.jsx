const MediaSection = () => {
  return (
    <div className="media-section">
      <h2 className="section-title">See It in Action</h2>
      <p className="media-intro">
        Watch the demo video and explore screenshots to see how Paisa Flow works
      </p>

      <div className="media-content">
        {/* Video Section */}
        <div className="video-container">
          <div className="video-wrapper">
            <div className="video-placeholder">
              <div className="play-button">
                <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="video-label">Demo Video Coming Soon</p>
              <span className="video-duration">2:30</span>
            </div>
          </div>
          <p className="video-caption">Complete walkthrough of Paisa Flow with Claude Desktop</p>
        </div>

        {/* Screenshots Grid */}
        <div className="screenshots-container">
          <h3 className="screenshots-title">Screenshots</h3>
          <div className="screenshots-grid">
            <div className="screenshot-card">
              <div className="screenshot-placeholder">
                <span className="screenshot-icon">📝</span>
                <span className="screenshot-label">Registration</span>
              </div>
              <p className="screenshot-caption">User registration in Claude</p>
            </div>
            <div className="screenshot-card">
              <div className="screenshot-placeholder">
                <span className="screenshot-icon">➕</span>
                <span className="screenshot-label">Add Transaction</span>
              </div>
              <p className="screenshot-caption">Adding expenses & income</p>
            </div>
            <div className="screenshot-card">
              <div className="screenshot-placeholder">
                <span className="screenshot-icon">📊</span>
                <span className="screenshot-label">Summary View</span>
              </div>
              <p className="screenshot-caption">Financial summary & analytics</p>
            </div>
            <div className="screenshot-card">
              <div className="screenshot-placeholder">
                <span className="screenshot-icon">📈</span>
                <span className="screenshot-label">Monthly Report</span>
              </div>
              <p className="screenshot-caption">Detailed monthly breakdown</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="feature-highlights">
        <div className="highlight-item">
          <span className="highlight-number">25+</span>
          <span className="highlight-label">Categories</span>
        </div>
        <div className="highlight-item">
          <span className="highlight-number">14</span>
          <span className="highlight-label">MCP Tools</span>
        </div>
        <div className="highlight-item">
          <span className="highlight-number">24h</span>
          <span className="highlight-label">Token Validity</span>
        </div>
        <div className="highlight-item">
          <span className="highlight-number">100%</span>
          <span className="highlight-label">Secure</span>
        </div>
      </div>
    </div>
  )
}

export default MediaSection
