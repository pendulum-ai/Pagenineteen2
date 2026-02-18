# DatoCMS Guide: Adding a New Article

This guide explains how to add a new article to the Pagenineteen website using the DatoCMS dashboard.

## 1. Accessing the Dashboard

1. Log in to your DatoCMS project dashboard: [admin.datocms.com](https://admin.datocms.com)
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

## Deploying Changes

For deployment instructions (both automatic and manual), see **[VERCEL_GUIDE.md](./VERCEL_GUIDE.md)**.

---

## See Also

- **[CLIENT_GUIDE.md](./CLIENT_GUIDE.md)** — Step-by-step guide for editing the website
- **[CLAUDE.md](../CLAUDE.md)** — AI agent instructions with full content map
