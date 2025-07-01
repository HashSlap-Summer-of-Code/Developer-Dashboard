# 🧩 HashSlap Developer Dashboard

![License](https://img.shields.io/badge/license-MIT-brightgreen)
![GitHub stars](https://img.shields.io/github/stars/HashSlap-Summer-of-Code/devhub)
![GitHub issues](https://img.shields.io/github/issues/HashSlap-Summer-of-Code/devhub)

A full-stack, open-source dashboard to track your GitHub contributions, blogs, CP stats, and more — inspired by developers, for developers.  
Built using **Next.js**, **Tailwind CSS**, **Clerk**, and deployed on **Netlify**.

---

## 🚀 Features

- 🔐 GitHub OAuth login (via Clerk.dev)
- 🧠 Personalized dashboard for each developer
- 📊 GitHub stats: commits, PRs, stars, repos
- ✍️ Blog integrations: Dev.to, Hashnode, Medium
- 🧑‍💻 Stack Overflow profile + reputation
- ⚔️ LeetCode, Codeforces, HackerRank support
- 🔧 Modular widget architecture (add your own!)
- ☁️ Deploys instantly on Netlify

---

## 🧱 Tech Stack

| Layer        | Tech                           |
|--------------|--------------------------------|
| Framework    | Next.js                        |
| Styling      | Tailwind CSS, ShadCN/UI        |
| Auth         | Clerk.dev (GitHub OAuth)       |
| Hosting      | Netlify                        |
| API Clients  | GitHub GraphQL, Dev.to RSS     |
| State Mgmt   | React Query, Zustand           |
| DB (Optional)| Supabase                       |

---

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/HashSlap-Summer-of-Code/devhub.git
cd devhub
```

> **Note:** After cloning, you should see a `devhub` folder with directories like `components`, `pages`, etc.  
> If not, verify your internet connection or try re-cloning the repo.

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Set up Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
GITHUB_TOKEN=your_token
```

---

### 4. Run the Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔧 Project Structure

```
devhub/
├── components/          # UI widgets & layout
├── pages/               # Next.js routing
├── lib/                 # API clients & utilities
├── netlify/functions/   # Serverless handlers
├── public/              # Static assets
├── hooks/               # React hooks
├── styles/              # Tailwind CSS
└── .env.local           # Environment config
```

---

## 🛠 Contributing

1. Fork this repo  
2. Create a feature branch  
3. Commit your code with clear messages  
4. Open a PR and link to an issue  

For full guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📜 License

Licensed under the [MIT License](./LICENSE)

---

## 🌐 Credits

Built with ❤️ by contributors in the [HashSlap Summer of Code](https://hashslap.dev) community.
