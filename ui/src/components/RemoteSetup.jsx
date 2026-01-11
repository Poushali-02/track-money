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
    <div className="bg-white/3 border border-white/8 rounded-2xl p-8 mb-16">
      <h2 className="text-white/90 text-xl font-semibold mb-6">Remote Setup — Recommended</h2>
      
      <div className="flex gap-2 mb-6 border-b border-white/10">
        <button 
          className={`px-4 py-2 font-medium transition-all ${activeTab === 'pro' ? 'text-white border-b-2 border-white' : 'text-white/50 hover:text-white/70'}`}
          onClick={() => setActiveTab('pro')}
        >
          Pro Users
        </button>
        <button 
          className={`px-4 py-2 font-medium transition-all ${activeTab === 'free' ? 'text-white border-b-2 border-white' : 'text-white/50 hover:text-white/70'}`}
          onClick={() => setActiveTab('free')}
        >
          Free Users
        </button>
      </div>

      {activeTab === 'pro' ? (
        <ul className="space-y-4">
          <li className="flex items-center gap-4">
            <span className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-white/90 font-semibold">1</span>
            <span className="text-white/70"><strong className="text-white">Settings</strong> → <strong className="text-white">Connectors</strong></span>
          </li>
          <li className="flex items-center gap-4">
            <span className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-white/90 font-semibold">2</span>
            <span className="text-white/70">Add custom Connector</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-white/90 font-semibold">3</span>
            <span className="text-white/70">Name: <strong className="text-white">"Paisa Flow"</strong></span>
          </li>
          <li className="flex items-start gap-4">
            <span className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-white/90 font-semibold">4</span>
            <div className="flex-1">
              <span className="text-white/70 block mb-2">Add URL:</span>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-3">
                <span className="text-white/90 font-mono text-sm flex-1">{MCP_URL}</span>
                <button 
                  className="bg-white text-black px-3 py-1 rounded text-sm font-semibold hover:bg-white/90 transition-all" 
                  onClick={copyUrl}
                >
                  {copied ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <span className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-white/90 font-semibold">5</span>
            <span className="text-white/70">Restart Claude Desktop</span>
          </li>
        </ul>
      ) : (
        <div>
          <p className="text-white/50 mb-4">
            Add to <strong className="text-white">claude_desktop_config.json</strong>
          </p>
          <div className="bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <div className="text-white/70">{'{'}</div>
            <div className="text-white/70">  <span className="text-green-400">"mcpServers"</span>: {'{'}</div>
            <div className="text-white/70">    <span className="text-green-400">"Paisa Flow"</span>: {'{'}</div>
            <div className="text-white/70">      <span className="text-green-400">"command"</span>: <span className="text-green-400">"npx"</span>,</div>
            <div className="text-white/70">      <span className="text-green-400">"args"</span>: [<span className="text-green-400">"mcp-remote"</span>,</div>
            <div className="text-white/70">        <span className="text-green-400">"{MCP_URL}"</span>]</div>
            <div className="text-white/70">    {'}'}</div>
            <div className="text-white/70">  {'}'}</div>
            <div className="text-white/70">{'}'}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RemoteSetup
