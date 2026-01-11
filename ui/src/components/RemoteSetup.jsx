import { useState } from 'react'

const MCP_URL = 'https://transaction-tracker.fastmcp.app/mcp'

const RemoteSetup = () => {
  const [activeTab, setActiveTab] = useState('pro')
  const [copied, setCopied] = useState(false)

  const copyUrl = () => {
    navigator.clipboard.writeText(MCP_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="section-card">
      <h2 className="section-title">Remote Setup — Recommended</h2>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'pro' ? 'active' : ''}`}
          onClick={() => setActiveTab('pro')}
        >
          Pro Users
        </button>
        <button 
          className={`tab ${activeTab === 'free' ? 'active' : ''}`}
          onClick={() => setActiveTab('free')}
        >
          Free Users
        </button>
      </div>

      {activeTab === 'pro' ? (
        <ul className="steps-list">
          <li className="step-item">
            <span className="step-icon">1</span>
            <span className="step-text"><strong>Settings</strong> → <strong>Connectors</strong></span>
          </li>
          <li className="step-item">
            <span className="step-icon">2</span>
            <span className="step-text">Add custom Connector</span>
          </li>
          <li className="step-item">
            <span className="step-icon">3</span>
            <span className="step-text">Name: <strong>"Paisa Flow"</strong></span>
          </li>
          <li className="step-item">
            <span className="step-icon">4</span>
            <span className="step-text">
              Add URL:
              <div className="url-display">
                <span className="url-text">{MCP_URL}</span>
                <button className="copy-btn" onClick={copyUrl}>
                  {copied ? '✓' : 'Copy'}
                </button>
              </div>
            </span>
          </li>
          <li className="step-item">
            <span className="step-icon">5</span>
            <span className="step-text">Restart Claude Desktop</span>
          </li>
        </ul>
      ) : (
        <div>
          <p className="step-text" style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.5)' }}>
            Add to <strong style={{color: '#fff'}}>claude_desktop_config.json</strong>
          </p>
          <div className="code-block">
            <code className="code-line">{'{'}</code>
            <code className="code-line">  <span className="string">"mcpServers"</span>: {'{'}</code>
            <code className="code-line">    <span className="string">"Paisa Flow"</span>: {'{'}</code>
            <code className="code-line">      <span className="string">"command"</span>: <span className="string">"npx"</span>,</code>
            <code className="code-line">      <span className="string">"args"</span>: [<span className="string">"mcp-remote"</span>,</code>
            <code className="code-line">        <span className="string">"{MCP_URL}"</span>]</code>
            <code className="code-line">    {'}'}</code>
            <code className="code-line">  {'}'}</code>
            <code className="code-line">{'}'}</code>
          </div>
        </div>
      )}
    </div>
  )
}

export default RemoteSetup
