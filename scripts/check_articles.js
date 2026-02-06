import { buildClient } from '@datocms/cma-client-node';

// Using the AdminJournal token
const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });

  console.log('📰 Fetching published articles from DatoCMS...\n');

  // Get all articles (including drafts for debugging)
  const items = await client.items.list({
    filter: {
      type: 'article',
    },
    order_by: 'date_DESC',
  });

  if (items.length === 0) {
    console.log('❌ No articles found in DatoCMS.');
    return;
  }

  console.log(`Found ${items.length} article(s):\n`);

  items.forEach((article, index) => {
    const status = article.meta.status;
    const statusIcon = status === 'published' ? '✅' : '📝';
    
    console.log(`${index + 1}. ${statusIcon} ${article.title || '(no title)'}`);
    console.log(`   Slug: ${article.slug || '(no slug)'}`);
    console.log(`   Date: ${article.date || '(no date)'}`);
    console.log(`   Tag: ${article.tag || '(no tag)'}`);
    console.log(`   Status: ${status}`);
    console.log(`   Excerpt: ${article.excerpt ? article.excerpt.substring(0, 80) + '...' : '(no excerpt)'}`);
    console.log('');
  });

  // Show raw data for first article
  if (items.length > 0) {
    console.log('--- Raw data for first article ---');
    console.log(JSON.stringify(items[0], null, 2));
  }
}

run().catch(error => {
  console.error('❌ Error fetching articles:');
  console.error(error.response ? JSON.stringify(error.response, null, 2) : error);
});
