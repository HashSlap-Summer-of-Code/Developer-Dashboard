# 🧩 HashSlap Developer Dashboard

<p align="center">
  <img src="https://img.shields.io/github/license/HashSlap-Summer-of-Code/devhub?style=flat-square&color=brightgreen" />
  <img src="https://img.shields.io/github/stars/HashSlap-Summer-of-Code/devhub?style=flat-square&color=blue" />
  <img src="https://img.shields.io/github/issues/HashSlap-Summer-of-Code/devhub?style=flat-square&color=green" />
  <img src="https://img.shields.io/github/forks/HashSlap-Summer-of-Code/devhub?style=flat-square&color=gray" />
</p>

---

## 🚀 Overview

**HashSlap Developer Dashboard** is a full-stack, open-source dashboard designed to showcase your GitHub activity, blogging presence, and competitive programming stats in one elegant UI.  
Perfect for developers looking to build a central profile powered by their public contributions.

> Built with: Next.js, Tailwind CSS, Clerk.dev, and deployed on Netlify ☁️

---

## 📁 Directory Structure

```bash
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

## 💡 Features

* 🔐 GitHub OAuth login (via Clerk.dev)
* 🧠 Personalized dashboard per user
* 📊 GitHub stats: commits, repos, stars, PRs
* ✍️ Blog integrations: Dev.to, Hashnode, Medium
* 👨‍💻 CP support: LeetCode, HackerRank, Codeforces
* 📚 Stack Overflow rep + profiles
* 🧩 Modular widget-based architecture
* ☁️ Deploys to Netlify instantly

---

## 🔧 How to Use

1. **Fork** this repository 🍴  
2. **Clone** your fork:

   ```bash
   git clone https://github.com/your-username/devhub.git
   cd devhub
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Configure environment variables**  
   Create a `.env.local` file in the root directory and add:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_key
   GITHUB_TOKEN=your_token
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see it live! 🎉

---

## 🛠️ Contributing

We welcome contributions of all kinds! Feel free to:

* Add new widgets or services (like GFG, Codewars, etc.)
* Improve performance, UI, or mobile responsiveness
* Fix bugs, create issues, or suggest enhancements
* Help improve documentation

**Standards:**

* Keep code modular, reusable, and well-commented
* Test your changes locally before pushing
* Link your PRs to existing issues if possible

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

Huge thanks to the HashSlap Summer of Code community 💙  
Built by and for open-source developers around the world.
