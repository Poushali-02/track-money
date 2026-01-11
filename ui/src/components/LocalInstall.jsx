import { useState } from 'react'

const GITHUB_URL = 'https://github.com/Poushali-02/Expense-Tracker-MCP-Server'

const prerequisites = [
  'Python 3.13+',
  'uv',
  'PostgreSQL 15+',
  'Claude Desktop'
]

const LocalInstall = () => {
  const [localTab, setLocalTab] = useState('auto')

  return (
    <div className="section-card">
      <h2 className="section-title">Local Installation — Advanced</h2>
      
      <div className="prerequisites">
        {prerequisites.map((prereq, index) => (
          <span className="prereq-item" key={index}>
            <span className="prereq-check">✓</span> {prereq}
          </span>
        ))}
      </div>

      <div className="code-block">
        <code className="code-line"><span className="command">git clone</span> <span className="string">https://github.com/Poushali-02/Expense-Tracker-MCP-Server.git</span></code>
        <code className="code-line"><span className="command">uv venv</span> <span className="keyword">&&</span> <span className="command">source</span> .venv/bin/activate</code>
        <code className="code-line"><span className="command">uv pip install</span> <span className="keyword">-r</span> requirements.txt</code>
        <code className="code-line"><span className="command">uv run fastmcp run</span> main.py</code>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${localTab === 'auto' ? 'active' : ''}`}
          onClick={() => setLocalTab('auto')}
        >
          Auto Install
        </button>
        <button 
          className={`tab ${localTab === 'manual' ? 'active' : ''}`}
          onClick={() => setLocalTab('manual')}
        >
          Manual Config
        </button>
      </div>

      {localTab === 'auto' ? (
        <div>
          <p className="step-text" style={{ marginBottom: '0.8rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
            Add server to Claude Desktop automatically:
          </p>
          <div className="code-block highlight">
            <code className="code-line"><span className="command">uv run fastmcp install</span> claude-desktop main.py</code>
          </div>
        </div>
      ) : (
        <div>
          <p className="step-text" style={{ marginBottom: '0.8rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
            Add to <strong style={{color: '#fff'}}>claude_desktop_config.json</strong>
          </p>
          <div className="code-block" style={{ fontSize: '0.7rem' }}>
            <code className="code-line">{'{'}</code>
            <code className="code-line">  <span className="string">"mcpServers"</span>: {'{'}</code>
            <code className="code-line">    <span className="string">"Paisa Flow"</span>: {'{'}</code>
            <code className="code-line">      <span className="string">"command"</span>: <span className="string">"uv"</span>,</code>
            <code className="code-line">      <span className="string">"args"</span>: [<span className="string">"--directory"</span>,</code>
            <code className="code-line">        <span className="string">"path/to/ExpenseTrackerMCP"</span>,</code>
            <code className="code-line">        <span className="string">"run"</span>, <span className="string">"--with"</span>, <span className="string">"fastmcp"</span>,</code>
            <code className="code-line">        <span className="string">"fastmcp"</span>, <span className="string">"run"</span>, <span className="string">"main.py"</span>]</code>
            <code className="code-line">    {'}'}</code>
            <code className="code-line">  {'}'}</code>
            <code className="code-line">{'}'}</code>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <a 
          href={GITHUB_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="github-btn"
        >
          <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  )
}

export default LocalInstall
