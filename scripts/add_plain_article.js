import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

// ==========================================
// REPLACE THIS DATA FOR EACH NEW ARTICLE
// ==========================================
const ARTICLE_DATA = {
  title: "REPLACE_TITLE",
  slug: "REPLACE_SLUG", 
  date: "2026-01-01",
  tag: "REPLACE_TAG",
  excerpt: "REPLACE_EXCERPT",
  readingTime: "5 min read",
  content: `
REPLACE_CONTENT_HERE
Double newlines will create new paragraphs.
Single newlines will be kept as soft line breaks within a paragraph if needed, but usually just spaces.
  `
};
// ==========================================

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });
  
  console.log(`📝 Adding "${ARTICLE_DATA.title}"...`);

  // Find Article Model
  const itemTypes = await client.itemTypes.list();
  const articleType = itemTypes.find(t => t.api_key === 'article');
  if (!articleType) throw new Error('Article model not found');

  // Convert plain text content to DAST (Structured Text)
  // We split by double newlines to get paragraphs.
  const paragraphs = ARTICLE_DATA.content
    .split(/\n\s*\n/) // Split by empty lines
    .map(p => p.trim())
    .filter(p => p.length > 0);

  const dastChildren = paragraphs.map(text => {
    return {
      type: 'paragraph',
      children: [
        {
          type: 'span',
          value: text
        }
      ]
    };
  });

  const article = await client.items.create({
    item_type: { type: 'item_type', id: articleType.id },
    title: ARTICLE_DATA.title,
    slug: ARTICLE_DATA.slug,
    date: ARTICLE_DATA.date,
    tag: ARTICLE_DATA.tag,
    excerpt: ARTICLE_DATA.excerpt,
    reading_time: ARTICLE_DATA.readingTime,
    content: {
      schema: 'dast',
      document: {
        type: 'root',
        children: dastChildren
      }
    }
  });

  console.log('✅ Article created!');
  
  await client.items.publish(article.id);
  console.log('📢 Published!');
}

run().catch(e => console.error(e));
