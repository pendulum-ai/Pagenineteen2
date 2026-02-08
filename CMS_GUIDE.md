# DatoCMS Guide: Adding a New Article

This guide explains how to add a new article to the Pagenineteen website using the DatoCMS dashboard.

## 1. Accessing the Dashboard

1. Log in to your DatoCMS project dashboard.
2. Navigate to the **Content** tab (on the top left).
3. Select **Article** from the list of models.

## 2. Creating a New Record

Click the **+ Add a new record** button (bottom right).

## 3. Filling in the Fields

Fill in the following fields. Fields marked with `*` are **required**.

| Field Name           | Required | Description                                                 | Example                                  |
| :------------------- | :------: | :---------------------------------------------------------- | :--------------------------------------- |
| **Title**            |    ✅    | The main headline of the article.                           | `An immersive language learning company` |
| **Slug**             |    ✅    | URL-friendly version of the title. Lowercase, hyphens only. | `immersive-language-learning`            |
| **Publication Date** |    ✅    | The date displayed on the article.                          | `2025-12-01`                             |
| **Tag**              |    ✅    | Category label. Keep it short (1 word).                     | `Vision` or `Product`                    |
| **Excerpt**          |    ✅    | Short summary shown on the card preview.                    | `Why we believe the next generation...`  |
| **Reading Time**     |    ✅    | Estimated reading time.                                     | `4 min read`                             |
| **Content**          |    ✅    | The body of the article (see formatting tips below).        | _Rich text_                              |
| **Cover Image**      |    ❌    | _Optional._ Not displayed on current site design.           | —                                        |
| **Author**           |    ❌    | _Optional._ Not displayed on current site design.           | —                                        |

---

### Tips for Content Formatting

- **Headings**: Use "Heading 2" for main sections. Avoid "Heading 1" (used for the title).
- **Quotes**: Use the "Quote" block to highlight key phrases.
- **Keep it simple**: The site supports paragraphs, headings, and quotes.

---

## 4. Publishing

1. Once finished, click **Save** (top right).
2. The status will be **Draft**.
3. To make it live on the website, click **Publish**.

_Note: The website may take a few minutes to update after publishing._

---

## Schema Notes

The Cover Image and Author fields are **optional** because the current website design does not display them. You can leave them empty.

---

# Vercel Deployment Guide

This section explains how to deploy and update the website on Vercel.

## Online Updates (Recommended)

Changes pushed to the main GitHub branch are **automatically deployed** by Vercel.

### Steps:

1. **Make your code changes** locally.
2. **Commit and push** to the `main` branch:
   ```bash
   git add .
   git commit -m "Your change description"
   git push origin main
   ```
3. **Vercel automatically detects** the push and starts a new deployment.
4. **Check deployment status** at [vercel.com/dashboard](https://vercel.com/dashboard).

> **Note:** Deployment typically takes 1-2 minutes. Preview the changes in the Vercel dashboard before they go live.

---

## Offline Updates (Manual Deploy via CLI)

Use this when you want to deploy without pushing to GitHub, or test a preview deployment.

### Initial Setup (One-time)

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Log in to Vercel**:

   ```bash
   vercel login
   ```

   Follow the prompts to authenticate via browser.

3. **Link the project** (run from the project root):
   ```bash
   vercel link
   ```

### Deploying

| Command         | Description                                       |
| --------------- | ------------------------------------------------- |
| `vercel`        | Creates a **preview deployment** (not production) |
| `vercel --prod` | Deploys directly to **production**                |

### Example Workflow

```bash
# Build locally to check for errors
npm run build

# Deploy to preview (for testing)
vercel

# If preview looks good, deploy to production
vercel --prod
```

---

## Quick Reference

| Action                       | Method                                               |
| ---------------------------- | ---------------------------------------------------- |
| Push to GitHub → Auto-deploy | `git push origin main`                               |
| Manual preview deploy        | `vercel`                                             |
| Manual production deploy     | `vercel --prod`                                      |
| Check deployment logs        | [vercel.com/dashboard](https://vercel.com/dashboard) |

---

## Troubleshooting

- **Build failed?** Run `npm run build` locally to see errors.
- **Environment variables missing?** Add them in Vercel Dashboard → Settings → Environment Variables.
- **Cache issues?** Try `vercel --force` to bypass cache.
