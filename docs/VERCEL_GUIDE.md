# Vercel Deployment Guide

This guide explains two methods to deploy the website: **Online (Automatic)** and **Offline (Manual)**.

**Live Domain:** [https://pagenineteen.ai](https://pagenineteen.ai) (Primary)
**Vercel URL:** [https://pagenineteen2-kappa.vercel.app](https://pagenineteen2-kappa.vercel.app) (Fallback)
**Vercel Team:** Pendulum (`lightnote`)

---

## 1. Online Updates (Recommended)

**Best for**: Routine updates, collaboration, and ensuring code is backed up.

When you push changes to GitHub, Vercel automatically detects them and updates the live site (`pagenineteen.ai`).

### Steps:

1.  **Make changes** to your code locally (e.g. reorder projects).
2.  **Commit and Push**:
    ```bash
    git add .
    git commit -m "Reorder projects: Amble first"
    git push origin main
    ```
3.  **Wait**: Vercel will automatically build and deploy (usually 20-30 seconds).
4.  **Verify**: Check [pagenineteen.ai](https://pagenineteen.ai).

---

## 2. Offline Updates (Manual CLI)

**Best for**: Quick previews, testing without committing code, or if GitHub is unavailable.

This method deploys directly from your computer to Vercel.

### Prerequisites (One-time setup):

1.  Install Vercel CLI:
    ```bash
    npm install -g vercel
    ```
2.  Login:
    ```bash
    vercel login
    ```
3.  Link Project (run in project root):
    ```bash
    vercel link
    ```
    When asked for scope, choose **Pendulum** (`lightnote`).

### How to Deploy:

#### A. Preview Deployment (Test)

Creating a unique URL to share or test without affecting the main site.

```bash
vercel
```

#### B. Production Deployment (Live)

Updating the main live website (`pagenineteen.ai`) immediately.

```bash
vercel --prod
```

---

## Domain Information

The custom domain `pagenineteen.ai` is connected via Vercel on the **Pendulum** team.

- **Registrar**: GoDaddy
- **DNS**: A-record / CNAME pointing to Vercel
- **Canonical domain**: `pagenineteen.ai` (without www)
- **www**: `www.pagenineteen.ai` (also configured)

## PostHog Analytics Proxy

The `vercel.json` file contains rewrite rules that proxy PostHog analytics through the site domain (`/ph-new/*`). This avoids ad-blockers and improves tracking accuracy. Do not remove these rules.

## Environment Variables

Required environment variables are configured in **Vercel Dashboard → Project Settings → Environment Variables**:

| Variable                 | Purpose                                        |
| ------------------------ | ---------------------------------------------- |
| `VITE_DATOCMS_API_TOKEN` | DatoCMS read-only API token (Journal articles) |
| `VITE_POSTHOG_KEY`       | PostHog analytics project key                  |

These must be set for Production, Preview, and Development environments.

## Troubleshooting

- **Build Failures**: Run `npm run build` locally to see if there are errors before deploying.
- **Missing Content**: Ensure `VITE_DATOCMS_API_TOKEN` is set in Vercel Project Settings.
- **Cache Issues**: If changes aren't showing, try `vercel --prod --force` to rebuild without cache.

---

## See Also

- **[README.md](../README.md)** — Technical architecture docs
- **[CLAUDE.md](../CLAUDE.md)** — AI agent instructions with full content map
- **[CMS_GUIDE.md](./CMS_GUIDE.md)** — How to add Journal articles via DatoCMS
- **[MIGRATION.md](./MIGRATION.md)** — Details of the Feb 2026 Vercel migration
