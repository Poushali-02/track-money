# Paisa Flow - Landing Page UI

A modern, responsive landing page for the **Paisa Flow MCP Server** - a comprehensive personal finance management system built with FastMCP for Claude Desktop integration.

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 🌐 Live Demo

**Website is live at: [https://paisa-flow.vercel.app/](https://paisa-flow.vercel.app/)**

## 🌟 Overview

This is the official landing page UI for the [Paisa Flow MCP Server](https://github.com/Poushali-02/Expense-Tracker-MCP-Server). It provides an elegant, user-friendly interface that showcases the server's features and guides users through both remote and local installation processes.

## ✨ Features

- **Modern Design**: Sleek black-white themed UI with clean aesthetics
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile
- **Interactive Tabs**: Easy navigation between different setup methods
- **Copy to Clipboard**: One-click URL copying for quick setup
- **Component-Based Architecture**: Modular React components for maintainability
- **Smooth Animations**: CSS animations and hover effects for enhanced UX

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Poushali-02/Transaction-Tracker-UI
   cd Transaction-Tracker-UI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
transactiontrackerui/
├── public/                  # Static assets
├── src/
│   ├── assets/             # Images and icons
│   ├── components/         # React components
│   │   ├── index.js        # Barrel exports
│   │   ├── Header.jsx      # Logo and title section
│   │   ├── Features.jsx    # Key features grid
│   │   ├── RemoteSetup.jsx # Remote server setup guide
│   │   └── LocalInstall.jsx# Local installation guide
│   ├── App.jsx             # Main application component
│   ├── App.css             # Component styles
│   ├── index.css           # Global styles
│   └── main.jsx            # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🧩 Components

### Header
Displays the application logo, title, and tagline with animated gradient text.

### Features
A responsive grid showcasing the 4 key features of the Transaction Tracker:
- 🔐 Secure Auth (JWT & Hashing)
- 💰 Dual Transactions (Expenses & Income)
- 📊 Advanced Analytics & Reporting
- 🔄 Recurring Transactions & Flexible Categorization

### RemoteSetup
Tabbed interface for remote server setup with:
- **Claude Pro Users**: Step-by-step connector setup guide
- **Claude Free Users**: JSON configuration for `claude_desktop_config.json`

### LocalInstall
Local installation guide featuring:
- Prerequisites checklist
- Clone and setup commands
- **Auto Install**: One-command Claude Desktop integration
- **Manual Config**: Full JSON configuration for manual setup

## 🎨 Styling

The UI uses a custom dark theme with:
- **Primary Background**: Deep blue gradient (`#0a1628` to `#061420`)
- **Accent Colors**: Cyan (`#00d4ff`), Green (`#00ff88`), Gold (`#ffd700`)
- **Card Style**: Semi-transparent with glowing borders
- **Typography**: System UI font stack for optimal readability

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic setup.

### Customization

To customize the MCP URL or GitHub repository link, edit the constants in:
- `src/components/RemoteSetup.jsx` - `MCP_URL`
- `src/components/LocalInstall.jsx` - `GITHUB_URL`

## 📱 Responsive Breakpoints

| Breakpoint | Description |
|------------|-------------|
| > 900px    | Full two-column layout |
| 600-900px  | Two-column features, single-column main content |
| < 600px    | Single-column layout throughout |

## 🛠️ Tech Stack

- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool
- **[React 18](https://react.dev/)** - UI library with hooks
- **CSS3** - Custom styling with CSS variables and animations
- **ESLint** - Code linting and formatting

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔗 Related Links

- **MCP Server Repository**: [Expense-Tracker-MCP-Server](https://github.com/Poushali-02/Expense-Tracker-MCP-Server)
- **Remote MCP URL**: https://transaction-tracker.fastmcp.app/mcp
- **FastMCP Cloud**: https://fastmcp.cloud

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Poushali**

- GitHub: [@Poushali-02](https://github.com/Poushali-02)

---

<p align="center">
  Made with ❤️ for the Claude Desktop community
</p>
