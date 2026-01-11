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
    <div className="bg-white/3 border border-white/8 rounded-2xl p-8 mb-16">
      <h2 className="text-white/90 text-xl font-semibold mb-6">Local Installation — Advanced</h2>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {prerequisites.map((prereq, index) => (
          <span className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white/70 text-sm" key={index}>
            <span className="text-green-400 mr-1">✓</span> {prereq}
          </span>
        ))}
      </div>

      <div className="bg-black/40 rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
        <div className="text-white/70"><span className="text-blue-400">git clone</span> <span className="text-green-400">https://github.com/Poushali-02/Expense-Tracker-MCP-Server.git</span></div>
        <div className="text-white/70"><span className="text-blue-400">uv venv</span> <span className="text-purple-400">&&</span> <span className="text-blue-400">source</span> .venv/bin/activate</div>
        <div className="text-white/70"><span className="text-blue-400">uv pip install</span> <span className="text-purple-400">-r</span> requirements.txt</div>
        <div className="text-white/70"><span className="text-blue-400">uv run fastmcp run</span> main.py</div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-white/10">
        <button 
          className={`px-4 py-2 font-medium transition-all ${localTab === 'auto' ? 'text-white border-b-2 border-white' : 'text-white/50 hover:text-white/70'}`}
          onClick={() => setLocalTab('auto')}
        >
          Auto Install
        </button>
        <button 
          className={`px-4 py-2 font-medium transition-all ${localTab === 'manual' ? 'text-white border-b-2 border-white' : 'text-white/50 hover:text-white/70'}`}
          onClick={() => setLocalTab('manual')}
        >
          Manual Config
        </button>
      </div>

      {localTab === 'auto' ? (
        <div>
          <p className="text-white/50 text-sm mb-3">
            Add server to Claude Desktop automatically:
          </p>
          <div className="bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <div className="text-white/70"><span className="text-blue-400">uv run fastmcp install</span> claude-desktop main.py</div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-white/50 text-sm mb-3">
            Add to <strong className="text-white">claude_desktop_config.json</strong>
          </p>
          <div className="bg-black/40 rounded-lg p-4 font-mono text-xs overflow-x-auto">
            <div className="text-white/70">{'{'}</div>
            <div className="text-white/70">  <span className="text-green-400">"mcpServers"</span>: {'{'}</div>
            <div className="text-white/70">    <span className="text-green-400">"Paisa Flow"</span>: {'{'}</div>
            <div className="text-white/70">      <span className="text-green-400">"command"</span>: <span className="text-green-400">"uv"</span>,</div>
            <div className="text-white/70">      <span className="text-green-400">"args"</span>: [<span className="text-green-400">"--directory"</span>,</div>
            <div className="text-white/70">        <span className="text-green-400">"path/to/ExpenseTrackerMCP"</span>,</div>
            <div className="text-white/70">        <span className="text-green-400">"run"</span>, <span className="text-green-400">"--with"</span>, <span className="text-green-400">"fastmcp"</span>,</div>
            <div className="text-white/70">        <span className="text-green-400">"fastmcp"</span>, <span className="text-green-400">"run"</span>, <span className="text-green-400">"main.py"</span>]</div>
            <div className="text-white/70">    {'}'}</div>
            <div className="text-white/70">  {'}'}</div>
            <div className="text-white/70">{'}'}</div>
          </div>
        </div>
      )}

      <div className="text-center mt-6">
        <a 
          href={GITHUB_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  )
}

export default LocalInstall
