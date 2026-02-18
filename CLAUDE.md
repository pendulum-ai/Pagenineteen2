# Page Nineteen — AI Agent Instructions

> This file is automatically read by AI coding assistants (Claude Code, Cursor, etc.).
> It provides everything needed to safely edit this website.

## Project Overview

**Page Nineteen** is a high-end marketing website for an applied multimodal AI lab.

- **Stack**: React 19 + Vite 7 + Framer Motion
- **CMS**: DatoCMS (headless, for Journal articles)
- **Hosting**: Vercel (auto-deploys from `main` branch)
- **Analytics**: PostHog
- **Live URL**: https://pagenineteen.ai
- **Font**: Satoshi (via Fontshare CDN)

---

## Content Map — Where Everything Lives

### 📝 Editable Text Content

| What                        | File                                                    | How to find                                                      |
| --------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| **Hero title**              | `src/components/sections/Hero.jsx`                      | Search for `An applied` inside `<motion.h1>`                     |
| **Hero subtitle**           | `src/components/sections/Hero.jsx`                      | Search for `Building at the intersection` inside `<motion.p>`    |
| **Hero location**           | `src/components/sections/Hero.jsx`                      | Search for `London / New York` inside `hero-footer`              |
| **Mission heading**         | `src/components/sections/MissionSection.jsx`            | Search for `Page Nineteen is a small` inside `<h2>`              |
| **Mission body**            | `src/components/sections/MissionSection.jsx`            | Search for `Our belief is that` inside `mission-belief-text`     |
| **Goal quote**              | `src/components/sections/GoalSection.jsx`               | Search for `The best technology` inside `<ScrollRevealText>`     |
| **Projects intro title**    | `src/components/sections/HorizontalProjectsSection.jsx` | Search for `Projects` — appears in both desktop and mobile views |
| **Projects intro subtitle** | `src/components/sections/HorizontalProjectsSection.jsx` | Search for `Exploring how new technology` — both views           |

### 📊 Data Files (arrays of objects)

| What                 | File                       | Structure                                                                                                                     |
| -------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Team members**     | `src/data/team.js`         | `{ id, name, role, previously, bio, linkedin, image }`                                                                        |
| **Projects**         | `src/data/projects.js`     | `{ id, title, tagline, description, link, github, focus[], stack[], bgColor, visualType, screenshotUrl, screenshotFallback }` |
| **Navigation links** | `src/config/navigation.js` | `navLinks`: `{ path, label }` — header nav items. ⚠️ Some pages are hidden with comments (see file)                           |
| **Social links**     | `src/config/navigation.js` | `socialLinks`: `{ label, url }` — footer social icons                                                                         |
| **Scroll sections**  | `src/data/scrollData.js`   | `FRAMES` array: `{ range[], title, text, isIntro? }` — the "Our work" scroll experience                                       |

### 📰 Journal Articles

Articles are managed through **DatoCMS** dashboard (not in code).

- Dashboard: https://admin.datocms.com
- Guide: See `docs/CMS_GUIDE.md` in this repo

---

## Safety Rules — What NOT to Touch

> [!CAUTION]
> These files control animations, layout physics, and core infrastructure.
> Editing them without understanding the system WILL break the site.

### ❌ DO NOT modify these files for content changes:

- `src/components/ui/*` — UI primitives (BlurReveal, CrossHair, CustomCursor, ScrollRevealText, LogoIcon, JournalCard, ProgressiveBlurBackdrop)
- `src/components/utils/*` — Utility components (Analytics, ErrorBoundary, ScrollToTop)
- `src/components/illustrations/*` — SVG animations (GeometricIllustration, HorizontalCircles)
- `src/components/layout/*` — Header, Footer, MobileMenu, GlobalBackground, ThemeController
- `src/components/projects/*` — Project card components
- `src/styles/*` — Design tokens, typography, utilities (CSS architecture)
- `src/config/themeConfig.js` — Theme configuration (route-based light/dark)
- `src/hooks/*` — Custom React hooks (`useIsMobile`)
- `src/context/*` — React context providers (`CursorContext`)
- `src/lib/datocms.js` — DatoCMS API client configuration
- `src/App.jsx` — Root component with routing, PostHog init, theme/cursor providers
- `src/main.jsx` — Entry point
- `vite.config.js` — Build configuration
- `vercel.json` — Hosting configuration
- `index.html` — SEO meta tags (modify only if SEO changes are explicitly requested)
- `.env` — API keys (NEVER commit this file)
- Any `.css` files — Design and layout styles

### ✅ SAFE to modify:

- `src/data/*.js` — Content data files (team, projects, scrollData)
- `src/config/navigation.js` — Nav links and social links
- Text strings inside `Hero.jsx`, `MissionSection.jsx`, `GoalSection.jsx`
- Text strings inside `HorizontalProjectsSection.jsx` (section title and subtitle only, NOT animation/layout code)
- `src/assets/images/team/*` — Team member photos (`.webp` format)
- `public/images/*` — Project screenshots
- `docs/CMS_GUIDE.md`, `docs/CLIENT_GUIDE.md` — Documentation

---

## Common Tasks — Copy-Paste Recipes

### Change a text on the homepage

1. Identify which section (Hero / Mission / Goal / Scroll)
2. Open the corresponding file from the Content Map above
3. Change ONLY the text string inside the JSX tags
4. Keep all `<br />`, `<br className="desktop-br" />` tags — they control line breaks
5. Test: `npm run dev` → check http://localhost:5173
6. Deploy: `git add . && git commit -m "Update [section] text" && git push origin main`

### Add a new team member

1. Add their photo to `src/assets/images/team/` (use `.webp` format, recommended ~400x400px — match existing photos)
2. Open `src/data/team.js`
3. Add import at top: `import newNameImg from '../assets/images/team/NewName.webp';`
4. Add object to the `teamMembers` array:

```js
{
  id: [next number],
  name: 'Full Name',
  role: 'Role Title',
  previously: 'Previous Companies',
  bio: 'Short description.',
  linkedin: 'https://www.linkedin.com/in/username/',
  image: newNameImg
}
```

5. Test and deploy (same as above)

### Remove a team member

1. Delete their object from `src/data/team.js`
2. Remove the import line for their image at the top of the file
3. Optionally delete their image from `src/assets/images/team/`
4. Test and deploy

### Change a project description

1. Open `src/data/projects.js`
2. Find the project by `id` (e.g., `'amble'`, `'pendulum'`, `'lightnote'`)
3. Edit `tagline`, `description`, or `focus[]` array
4. Test and deploy

### Update navigation or social links

1. Open `src/config/navigation.js`
2. Edit `navLinks` array (to change/add/remove pages from header)
3. Edit `socialLinks` array (to add real social media URLs)
4. Test and deploy

### Add a Journal article

See `docs/CMS_GUIDE.md` — articles are managed through the DatoCMS dashboard, not in code.

---

## Development Workflow

### Local development

```bash
npm install          # First time only — install dependencies
npm run dev          # Start dev server at http://localhost:5173
```

### Deploying changes

```bash
git add .
git commit -m "Describe what changed"
git push origin main
```

Vercel auto-deploys within 1-2 minutes. Check https://pagenineteen.ai to verify.

### If something breaks

```bash
npm run build        # Check for build errors locally
git log -5           # See recent commits
git revert HEAD      # Undo the last commit
git push origin main # Deploy the revert
```

---

## File Tree (Key Files Only)

```
├── CLAUDE.md              ← You are here (AI agent instructions)
├── README.md              ← Technical architecture docs
│
├── docs/
│   ├── CLIENT_GUIDE.md    ← Step-by-step guide for the client
│   ├── CMS_GUIDE.md       ← How to use DatoCMS for articles
│   ├── VERCEL_GUIDE.md    ← Deployment details and domain info
│   └── SEO_STATUS.md      ← SEO optimization status
│
├── src/
│   ├── data/
│   │   ├── team.js        ← 👤 Team members
│   │   ├── projects.js    ← 📦 Projects
│   │   └── scrollData.js  ← 📜 "Our work" scroll content
│   │
│   ├── config/
│   │   └── navigation.js  ← 🔗 Nav links + social links (some pages hidden)
│   │
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.jsx                       ← 🏠 Hero section text
│   │   │   ├── MissionSection.jsx             ← 💡 Mission section text
│   │   │   ├── GoalSection.jsx                ← 🎯 Goal section text
│   │   │   └── HorizontalProjectsSection.jsx  ← 📋 Projects intro text
│   │   ├── ui/            ← ⚠️ UI primitives (do not modify)
│   │   ├── utils/         ← ⚠️ Utility components (do not modify)
│   │   ├── layout/        ← ⚠️ Header, Footer, etc. (do not modify)
│   │   ├── projects/      ← ⚠️ Project cards (do not modify)
│   │   └── illustrations/ ← ⚠️ SVG animations (do not modify)
│   │
│   ├── lib/datocms.js     ← ⚠️ CMS API client (do not modify)
│   ├── pages/             ← Route pages (HomeV2, Journal, ArticleDetail, Team, Projects, NotFound)
│   ├── styles/            ← ⚠️ CSS architecture (do not modify for content)
│   └── assets/images/     ← Static images including team photos
│
├── public/
│   ├── images/            ← Project screenshots
│   ├── sitemap.xml        ← SEO sitemap
│   └── robots.txt         ← Search engine rules
│
└── index.html             ← SEO meta tags, structured data
```

---

## Environment Variables

The `.env` file is NOT committed to Git (listed in `.gitignore`).
Required variables:

| Variable                 | Purpose                                            |
| ------------------------ | -------------------------------------------------- |
| `VITE_DATOCMS_API_TOKEN` | DatoCMS read-only API token (for Journal articles) |
| `VITE_POSTHOG_KEY`       | PostHog analytics project key                      |
| `VITE_POSTHOG_HOST`      | PostHog EU instance URL                            |

These are also configured in Vercel Dashboard → Settings → Environment Variables.
