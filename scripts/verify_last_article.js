import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });
  
  // Find Amble article
  const items = await client.items.list({
    filter: {
      type: 'article',
      query: 'Amble',
    },
  });

  if (items.length === 0) {
    console.log('❌ Article "Amble Lite Paper" not found.');
    return;
  }

  const article = items[0];
  console.log('✅ Found article:', article.title);
  console.log('   ID:', article.id);
  console.log('   Status:', article.meta.status);
  console.log('   Reading Time:', article.reading_time); // CMA uses snake_case

  console.log('\n--- Content Snippet (first 2 blocks) ---');
  if (article.content && article.content.document) {
    const blocks = article.content.document.children.slice(0, 2);
    console.log(JSON.stringify(blocks, null, 2));
  } else {
    console.log('❌ No content/document found');
  }

  console.log('\n--- References Check (last block?) ---');
  const lastBlocks = article.content.document.children.slice(-3);
  console.log(JSON.stringify(lastBlocks, null, 2));
}

run().catch(console.error);
