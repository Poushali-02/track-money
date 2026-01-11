const features = [
  { icon: '🔐', title: 'Secure Auth', desc: 'JWT & Password Hashing' },
  { icon: '💸', title: 'Track Everything', desc: 'Expenses & Income' },
  { icon: '📊', title: 'Analytics', desc: 'Reports & Insights' },
  { icon: '🔄', title: 'Recurring', desc: 'Auto Transactions' }
]

const Features = () => {
  return (
    <section className="features-section">
      <h2 className="features-title">Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-card-title">{feature.title}</h3>
            <p className="feature-desc">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
