# Vercel Migration — February 24, 2026

> **For AI agents**: This document describes a hosting migration. The codebase is unchanged — only the Vercel hosting environment moved from a personal account to a team account. All environment variables, domains, and CI/CD pipelines have been reconfigured.

## What Changed

The project hosting was migrated from **Nikita's personal Vercel** (`nikitas-projects-3a31754b`) to the **Pendulum team Vercel** (`lightnote`).

### Before → After

| Component                    | Before                      | After                       |
| ---------------------------- | --------------------------- | --------------------------- |
| Vercel Scope                 | `nikitas-projects-3a31754b` | `lightnote` (Pendulum team) |
| Project Name                 | `pagenineteen2`             | `pagenineteen2` (same)      |
| Domain `pagenineteen.ai`     | Personal Vercel             | Pendulum Vercel             |
| Domain `www.pagenineteen.ai` | Personal Vercel             | Pendulum Vercel             |
| GitHub CI/CD                 | Personal Vercel             | Pendulum Vercel             |
| Old project                  | Git disconnected, archived  | —                           |

### No Code Changes

- **No files were modified** in the codebase
- **No dependencies changed**
- The migration was purely infrastructure (Vercel project, domains, env variables)

---

## Current Hosting Setup

### Vercel Project

- **Team**: Pendulum (`lightnote`)
- **Project**: `pagenineteen2`
- **Framework**: Vite (auto-detected)
- **Production URL**: https://pagenineteen.ai
- **Vercel URL**: https://pagenineteen2-kappa.vercel.app

### Domains

| Domain                | Status                | DNS                         |
| --------------------- | --------------------- | --------------------------- |
| `pagenineteen.ai`     | ✅ Active on Pendulum | GoDaddy (A-record → Vercel) |
| `www.pagenineteen.ai` | ✅ Active on Pendulum | GoDaddy (CNAME → Vercel)    |

### Environment Variables

These are configured in **Vercel Dashboard → Project → Settings → Environment Variables** for all three environments (Production, Preview, Development):

| Variable                 | Purpose                                          | Required |
| ------------------------ | ------------------------------------------------ | -------- |
| `VITE_DATOCMS_API_TOKEN` | DatoCMS read-only API token for Journal articles | Yes      |
| `VITE_POSTHOG_KEY`       | PostHog analytics project key                    | Yes      |

> **Note**: `VITE_` prefix means these are embedded into the JS bundle at build time (Vite convention). They are NOT server-side secrets.

### CI/CD Pipeline

```
git push origin main → GitHub webhook → Vercel (Pendulum) auto-build → pagenineteen.ai
```

- Any push to `main` from **any collaborator** triggers auto-deploy
- Pull requests create **preview deployments** with unique URLs
- Build time: ~20-30 seconds

---

## For the Client's AI Agent

If you are an AI agent working on this project, here is what you need to know:

1. **Deployments** go to Vercel team `lightnote` (Pendulum), not a personal account
2. **`vercel.json`** contains PostHog analytics proxy rewrites (`/ph-new/*`) and SPA fallback — do not remove
3. **Environment variables** are NOT in the repo (`.env` is in `.gitignore`). They live in Vercel Dashboard
4. **To deploy**: just `git push origin main` — Vercel handles everything automatically
5. **Local development** requires a `.env` file with `VITE_DATOCMS_API_TOKEN` and `VITE_POSTHOG_KEY`
6. **The old Vercel project** on `nikitas-projects-3a31754b` still exists as an archive with Git disconnected — it will not receive any new deployments
