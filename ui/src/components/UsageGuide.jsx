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
    <div className="usage-guide-section">
      <h2 className="section-title">How to Use in Claude</h2>
      <p className="guide-intro">
        Follow these steps to start managing your finances with Claude
      </p>
      
      <div className="steps-timeline">
        {steps.map((step, index) => (
          <div className="timeline-step" key={index}>
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              <div className="step-meta">
                <span className="step-command">
                  <span className="command-label">Tool:</span> {step.command}
                </span>
                <span className="step-tip">
                  <span className="tip-icon">💡</span> {step.tip}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-commands">
        <h3 className="quick-commands-title">Quick Command Reference</h3>
        <div className="commands-grid">
          <div className="command-card">
            <span className="command-emoji">➕</span>
            <span className="command-name">Add Transaction</span>
            <code>"Add expense of ₹1000 for rent"</code>
          </div>
          <div className="command-card">
            <span className="command-emoji">📊</span>
            <span className="command-name">Get Balance</span>
            <code>"What's my current balance?"</code>
          </div>
          <div className="command-card">
            <span className="command-emoji">🏆</span>
            <span className="command-name">Top Categories</span>
            <code>"Show my top spending categories"</code>
          </div>
          <div className="command-card">
            <span className="command-emoji">🔄</span>
            <span className="command-name">Update Transaction</span>
            <code>"Update transaction #123 amount to ₹500"</code>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsageGuide
