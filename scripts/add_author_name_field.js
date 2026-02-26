import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });

  console.log('Adding author_name field to Article model...\n');

  // Find the article model
  const itemTypes = await client.itemTypes.list();
  const articleType = itemTypes.find(t => t.api_key === 'article');

  if (!articleType) {
    console.error('Article model not found!');
    return;
  }

  // Check if field already exists
  const fields = await client.fields.list(articleType.id);
  const existing = fields.find(f => f.api_key === 'author_name');

  if (existing) {
    console.log('author_name field already exists. Skipping creation.');
  } else {
    await client.fields.create(articleType.id, {
      label: 'Author Name',
      api_key: 'author_name',
      field_type: 'string',
    });
    console.log('Created author_name field.');
  }

  // Find the "How Pendulum searches" article and set author_name
  const items = await client.items.list({
    filter: { type: 'article' },
  });

  const target = items.find(a =>
    a.title && a.title.toLowerCase().includes('how pendulum search')
  );

  if (!target) {
    console.log('\nCould not find "How Pendulum searches" article. Articles found:');
    items.forEach(a => console.log(`  - ${a.title} (${a.slug})`));
    return;
  }

  console.log(`\nFound article: "${target.title}" (id: ${target.id})`);
  console.log('Setting author_name to "William"...');

  await client.items.update(target.id, { author_name: 'William' });
  console.log('Done! author_name set to "William".');

  // Republish if it was published
  if (target.meta.status === 'published') {
    await client.items.publish(target.id);
    console.log('Article republished.');
  }

  console.log('\n✅ Migration complete!');
}

run().catch(error => {
  console.error('❌ Error:');
  console.error(error.response ? JSON.stringify(error.response, null, 2) : error);
});
