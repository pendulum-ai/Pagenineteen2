# Vercel Deployment Guide

This guide explains two methods to deploy the website: **Online (Automatic)** and **Offline (Manual)**.

---

## 1. Online Updates (Recommended)

**Best for**: Routine updates, collaboration, and ensuring code is backed up.

When you push changes to GitHub, Vercel automatically detects them and updates the live site.

### Steps:

1.  **Make changes** to your code locally.
2.  **Commit and Push**:
    ```bash
    git add .
    git commit -m "Description of changes"
    git push origin main
    ```
3.  **Wait**: Vercel will automatically build and deploy (usually 1-2 minutes).
4.  **Verify**: Check your live URL (e.g., `pagenineteen2.vercel.app`).

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

### How to Deploy:

#### A. Preview Deployment (Test)

Creating a unique URL to share or test without affecting the main site.

```bash
vercel
```

#### B. Production Deployment (Live)

Updating the main live website immediately.

```bash
vercel --prod
```

---

## Troubleshooting

- **Build Failures**: Run `npm run build` locally to see if there are errors before deploying.
- **Missing Content**: Ensure `datocms` environment variables are set in Vercel Project Settings.
- **Cache Issues**: If changes aren't showing, try `vercel --prod --force` to rebuild without cache.
