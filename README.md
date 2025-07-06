# 🚀 Universal Developer Dashboard

A comprehensive, open-source dashboard that aggregates data from all major developer platforms into one beautiful, unified interface.

![Dashboard Preview](https://img.shields.io/badge/Status-Beta-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC)

## ✨ Features

### 🔗 Multi-Platform Integration
- **GitHub**: Repositories, stars, contributions, language stats
- **LeetCode**: Problem solving stats, contest performance, badges
- **npm**: Package downloads and statistics
- **Dev.to**: Article analytics and engagement
- **Stack Overflow**: Reputation and badge tracking
- **HackerRank**: Coding challenges and certifications
- **Codeforces**: Competitive programming stats

### 📊 Rich Analytics
- Contribution heatmaps (GitHub-style)
- Language distribution charts
- Problem-solving progress tracking
- Real-time data updates with caching
- Interactive data visualizations

### 🎨 Modern UI/UX
- Responsive design (mobile-first)
- Dark/Light theme support
- Smooth animations and transitions
- Modular widget architecture
- Customizable dashboard layout

### ⚡ Performance
- Server-side caching
- Optimized API calls
- Lazy loading components
- Progressive Web App ready

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Charts**: Recharts
- **Icons**: React Icons
- **Styling**: Tailwind CSS with custom components
- **Caching**: In-memory cache with TTL
- **Deployment**: Vercel/Netlify ready

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/universal-dev-dashboard.git
   cd universal-dev-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your API keys:
   ```env
   # GitHub API
   GITHUB_TOKEN=your_github_personal_access_token
   
   # LeetCode (optional)
   LEETCODE_USERNAME=your_leetcode_username
   
   # Other services...
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### GitHub Setup
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `public_repo` and `read:user` scopes
3. Add the token to your `.env.local` file

### LeetCode Setup
1. Your LeetCode username is sufficient (no API key required)
2. Add your username to the dashboard settings

### Other Services
Each service has its own configuration requirements. Check the individual service documentation for setup instructions.

## 📁 Project Structure

```
universal-dev-dashboard/
├── components/
│   ├── dashboard/          # Dashboard layout components
│   ├── widgets/           # Service-specific widgets
│   └── ui/               # Reusable UI components
├── lib/
│   ├── api/              # API service handlers
│   └── utils/            # Utility functions
├── pages/
│   ├── api/              # Next.js API routes
│   └── index.js          # Main dashboard page
├── public/
│   └── icons/            # Service icons
├── styles/
│   └── globals.css       # Global styles
└── hooks/                # Custom React hooks
```

## 🎯 Usage

### Adding New Services

1. **Create API handler** in `lib/api/`
   ```javascript
   // lib/api/newservice.js
   export const getUserStats = async ({ username }) => {
     // API implementation
   };
   ```

2. **Create widget component** in `components/widgets/`
   ```jsx
   // components/widgets/NewServiceWidget.jsx
   const NewServiceWidget = ({ username }) => {
     // Widget implementation
   };
   ```

3. **Add to API router** in `pages/api/[...service].js`
   ```javascript
   const serviceHandlers = {
     // ... existing services
     newservice: {
       stats: newservice.getUserStats
     }
   };
   ```

### Customizing Widgets

Each widget is self-contained and can be customized independently:

```jsx
<GitHubWidget 
  username="your-username"
  token="your-token"
  showRepos={true}
  showContributions={true}
/>
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` directory
3. Add environment variables in Netlify dashboard

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Add tests** (if applicable)
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add TypeScript types when possible
- Include proper error handling
- Write meaningful commit messages
- Test your changes thoroughly

## 📝 API Documentation

### GitHub API
```javascript
GET /api/github/stats?username=username&token=token
```

### LeetCode API
```javascript
GET /api/leetcode/stats?username=username
```

### Response Format
```json
{
  "username": "string",
  "stats": {
    "repos": "number",
    "stars": "number",
    "followers": "number"
  },
  "data": "object"
}
```

## 🐛 Troubleshooting

### Common Issues

**GitHub API Rate Limits**
- Use a personal access token
- Implement proper caching
- Consider using GitHub Apps for higher limits

**LeetCode Data Not Loading**
- Verify username is correct
- Check network connectivity
- Ensure user profile is public

**Widget Not Rendering**
- Check browser console for errors
- Verify API endpoints are working
- Ensure all required props are passed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Recharts](https://recharts.org/) for beautiful data visualizations
- [React Icons](https://react-icons.github.io/react-icons/) for the icon library
- All the open-source contributors who made this possible

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/universal-dev-dashboard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/universal-dev-dashboard/discussions)
- **Email**: your-email@example.com

---

**Made with ❤️ by the open-source community**
