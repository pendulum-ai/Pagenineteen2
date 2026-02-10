import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });
  
  console.log('🗑️ Fetching all articles to delete...');
  
  // Fetch all articles
  const articles = await client.items.list({
    filter: {
      type: 'article',
    },
    page: { limit: 100 }
  });

  if (articles.length === 0) {
    console.log('✅ No articles found to delete.');
    return;
  }

  console.log(`⚠️ Found ${articles.length} articles. Deleting them now...`);

  for (const article of articles) {
    console.log(`   Deleting "${article.title}" (ID: ${article.id})...`);
    await client.items.destroy(article.id);
  }

  console.log('✅ All articles deleted successfully!');
}

run().catch(error => {
  console.error('❌ Error deleting articles:');
  console.error(error);
});
