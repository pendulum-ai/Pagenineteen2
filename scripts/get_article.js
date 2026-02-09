import { buildClient } from '@datocms/cma-client-node';

// AdminJournal token
const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });
  const slug = 'agentic-workflows-for-creative-teams';

  console.log(`🔍 Fetching article with slug: ${slug}...`);

  const items = await client.items.list({
    filter: {
      type: 'article',
      fields: {
        slug: { eq: slug }
      }
    }
  });

  if (items.length === 0) {
    console.error('❌ Article not found');
    return;
  }

  const article = items[0];
  console.log('✅ Article found:');
  console.log(JSON.stringify(article, null, 2));
}

run().catch(console.error);
