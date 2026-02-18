# How to Edit the Page Nineteen Website

> This guide is written for non-developers. Follow the steps below to set up your editing environment and make changes to the website using an AI assistant.

---

## What You'll Need

Before you start, install these three things (all free):

| Tool        | What it does                              | Download                                                     |
| ----------- | ----------------------------------------- | ------------------------------------------------------------ |
| **Cursor**  | A code editor with built-in AI            | [cursor.com](https://www.cursor.com/)                        |
| **Node.js** | Runs the website locally on your computer | [nodejs.org](https://nodejs.org/) (choose LTS version)       |
| **Git**     | Tracks and syncs changes                  | Included with Cursor, or [git-scm.com](https://git-scm.com/) |

---

## First-Time Setup (10 minutes)

### Step 1: Get access to the code

Your developer will add you as a **collaborator** on the GitHub repository. You'll receive an email invitation — accept it.

### Step 2: Clone the project

Open **Cursor** and press `Cmd + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows), then type "Git Clone" and paste this URL:

```
https://github.com/Raw3hape/Pagenineteen2.git
```

Choose a folder on your computer where you want to store the project files.

### Step 3: Set up the environment file

Your developer will send you a `.env` file with the necessary API keys. Place this file in the root of the project folder (the same level as `package.json`).

> ⚠️ **Important**: Never share the `.env` file or commit it to GitHub. It contains private API keys.

### Step 4: Install dependencies

Open the **Terminal** in Cursor (`` Ctrl + ` `` or `Cmd + J`) and run:

```bash
npm install
```

### Step 5: Start the local preview

```bash
npm run dev
```

Open http://localhost:5173 in your browser. You should see the website running locally.

---

## Making Changes with AI

Once your project is open in Cursor, you can ask the AI assistant to make changes for you. Here are example prompts you can copy and paste:

### Change text on the homepage

```
Change the hero title from "An applied multimodal AI lab" to "A creative AI studio"
```

```
Update the mission section text to say "We build intelligent tools for creative professionals"
```

### Edit team members

```
Change Pedro's role from "Founding Engineer" to "Lead Engineer"
```

```
Add a new team member: Sarah Chen, role "Product Designer", previously "Apple, Figma", bio "Product and experience design", linkedin "https://linkedin.com/in/sarahchen"
```

```
Remove Oliver Mayes from the team page
```

### Edit projects

```
Update the Amble project description to say "AI-powered language tutoring platform"
```

```
Change the Pendulum tagline to "Intelligent media asset management"
```

### Edit navigation

```
Add a "Contact" link to the navigation that goes to "/contact"
```

```
Update the Instagram social link to "https://instagram.com/pagenineteen"
```

### Add a Journal article

Journal articles are managed through a separate dashboard (DatoCMS), not through Cursor. See the `CMS_GUIDE.md` file in the project for instructions.

---

## Publishing Your Changes

After the AI makes changes and you've verified them in your local preview (http://localhost:5173), you need to **publish** them to the live website.

### Option A: Ask the AI to deploy

Simply type in Cursor:

```
Commit these changes and push to main
```

The AI will handle the Git commands for you.

### Option B: Deploy manually via Terminal

```bash
git add .
git commit -m "Updated hero text"
git push origin main
```

After pushing, Vercel will automatically build and deploy within 1-2 minutes. Check https://pagenineteen.ai to see your changes live.

> For advanced deployment options (manual CLI, preview deployments), see `VERCEL_GUIDE.md`.

---

## If Something Goes Wrong

### The local preview won't start

```bash
npm install
npm run dev
```

### The website looks broken after a change

Ask the AI:

```
Undo the last change and restore the previous version
```

Or manually in the terminal:

```bash
git revert HEAD
git push origin main
```

### You see "merge conflict" errors

This means someone else edited the same file at the same time. Ask the AI:

```
Resolve the merge conflict and keep the latest changes
```

### You need to get the latest version

If your developer made changes, pull them before editing:

```bash
git pull origin main
```

---

## What You CAN and CANNOT Change

### ✅ Safe to change (content only)

- Text on any page (titles, descriptions, quotes)
- Team members (add, edit, remove)
- Project descriptions and details
- Navigation links
- Social media URLs
- Images in `public/images/` and `src/assets/images/team/`
- Journal articles (via DatoCMS dashboard)

### ❌ Do NOT change (will break the site)

- Any `.css` files (design and layout)
- Files in `src/components/ui/` (animation components)
- Files in `src/components/layout/` (header, footer, navigation)
- Files in `src/components/projects/` (project card rendering)
- Files in `src/lib/` (API connections)
- `App.jsx`, `main.jsx` (core application)
- `vite.config.js`, `vercel.json` (build configuration)
- `.env` file (API keys — never push to GitHub)

> **Rule of thumb**: If you're only changing _text_ or _data_, you're safe. If the AI wants to modify animation code or CSS, say no and ask for a different approach.

---

## Quick Reference

| I want to...          | What to do                                |
| --------------------- | ----------------------------------------- |
| Edit website text     | Ask AI in Cursor                          |
| Add/edit team members | Ask AI in Cursor                          |
| Add a journal article | Use DatoCMS dashboard (`CMS_GUIDE.md`)    |
| Publish changes       | `git push origin main` or ask AI          |
| Preview locally       | `npm run dev` → http://localhost:5173     |
| Undo a mistake        | `git revert HEAD && git push origin main` |
| Get latest code       | `git pull origin main`                    |
