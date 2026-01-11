const steps = [
  {
    number: '01',
    title: 'Register Your Account',
    description: 'Open Claude and type: "Register me with username [your_username], password [your_password], email [your_email]"',
    command: 'register_user',
    tip: 'Use a strong password with at least 8 characters'
  },
  {
    number: '02',
    title: 'Login to Get Token',
    description: 'Type: "Login with username [your_username] and password [your_password]"',
    command: 'login_user',
    tip: 'Save your JWT token - it expires in 24 hours'
  },
  {
    number: '03',
    title: 'Add Your First Transaction',
    description: 'Type: "Add an expense of ₹500 for groceries on 2025-12-17"',
    command: 'addTransaction',
    tip: 'You can add both expenses and credits (income)'
  },
  {
    number: '04',
    title: 'View All Transactions',
    description: 'Type: "Show me all my transactions"',
    command: 'get_all_transactions',
    tip: 'Filter by date range for specific periods'
  },
  {
    number: '05',
    title: 'Get Financial Summary',
    description: 'Type: "Give me a summary of my spending"',
    command: 'get_summary',
    tip: 'Includes category breakdown and insights'
  },
  {
    number: '06',
    title: 'Generate Monthly Report',
    description: 'Type: "Generate my monthly report for December 2025"',
    command: 'monthly_report',
    tip: 'Perfect for tracking monthly budgets'
  }
]

const UsageGuide = () => {
  return (
    <div className="mb-16">
      <h2 className="text-white/90 text-xl font-semibold mb-4">How to Use in Claude</h2>
      <p className="text-white/70 mb-8 text-center">
        Follow these steps to start managing your finances with Claude
      </p>
      
      <div className="space-y-6 mb-12">
        {steps.map((step, index) => (
          <div className="flex gap-4 bg-white/3 border border-white/8 rounded-2xl p-6 hover:bg-white/5 transition-all" key={index}>
            <div className="bg-white/10 rounded-lg px-3 py-1 h-fit text-white/90 font-bold">{step.number}</div>
            <div className="flex-1">
              <h3 className="text-white text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-white/70 mb-3">{step.description}</p>
              <div className="flex flex-col sm:flex-row gap-2 text-sm">
                <span className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white/60">
                  <span className="text-white/90 font-medium">Tool:</span> {step.command}
                </span>
                <span className="bg-blue-500/10 border border-blue-500/20 rounded px-2 py-1 text-blue-300/80">
                  <span>💡</span> {step.tip}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/3 border border-white/8 rounded-2xl p-8">
        <h3 className="text-white text-lg font-semibold mb-6">Quick Command Reference</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/8 transition-all">
            <span className="text-2xl mb-2 block">➕</span>
            <span className="text-white font-medium block mb-2">Add Transaction</span>
            <code className="text-white/60 text-sm">"Add expense of ₹1000 for rent"</code>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/8 transition-all">
            <span className="text-2xl mb-2 block">📊</span>
            <span className="text-white font-medium block mb-2">Get Balance</span>
            <code className="text-white/60 text-sm">"What's my current balance?"</code>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/8 transition-all">
            <span className="text-2xl mb-2 block">🏆</span>
            <span className="text-white font-medium block mb-2">Top Categories</span>
            <code className="text-white/60 text-sm">"Show my top spending categories"</code>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/8 transition-all">
            <span className="text-2xl mb-2 block">🔄</span>
            <span className="text-white font-medium block mb-2">Update Transaction</span>
            <code className="text-white/60 text-sm">"Update transaction #123 amount to ₹500"</code>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsageGuide
