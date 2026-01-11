const features = [
  { icon: '🔐', title: 'Secure Auth', desc: 'JWT & Password Hashing' },
  { icon: '💸', title: 'Track Everything', desc: 'Expenses & Income' },
  { icon: '📊', title: 'Analytics', desc: 'Reports & Insights' },
  { icon: '🔄', title: 'Recurring', desc: 'Auto Transactions' }
]

const Features = () => {
  return (
    <section className="mb-16">
      <h2 className="text-white/40 text-xs font-semibold mb-5 uppercase tracking-widest text-center">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white/3 border border-white/8 rounded-2xl p-6 text-center transition-all duration-300 hover:transform hover:-translate-y-1 hover:bg-white/6 hover:border-white/15"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
              {feature.icon}
            </div>
            <h3 className="text-white font-semibold text-base mb-1">{feature.title}</h3>
            <p className="text-white/50 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features

