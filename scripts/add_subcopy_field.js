import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });

  console.log('Adding subcopy field and updating Pendulum article...\n');

  // Find the article model
  const itemTypes = await client.itemTypes.list();
  const articleType = itemTypes.find(t => t.api_key === 'article');

  if (!articleType) {
    console.error('Article model not found!');
    return;
  }

  // Check if subcopy field already exists
  const fields = await client.fields.list(articleType.id);
  const existing = fields.find(f => f.api_key === 'subcopy');

  if (existing) {
    console.log('subcopy field already exists. Skipping creation.');
  } else {
    await client.fields.create(articleType.id, {
      label: 'Subcopy',
      api_key: 'subcopy',
      field_type: 'string',
    });
    console.log('Created subcopy field.');
  }

  // Find the Pendulum article
  const items = await client.items.list({
    filter: { type: 'article' },
  });

  const target = items.find(a =>
    a.title && a.title.toLowerCase().includes('how pendulum search')
  );

  if (!target) {
    console.log('\nCould not find Pendulum article. Articles found:');
    items.forEach(a => console.log(`  - "${a.title}" (${a.slug})`));
    return;
  }

  console.log(`\nFound article: "${target.title}" (id: ${target.id})`);
  console.log('Updating title, subcopy, and confirming author_name...');

  await client.items.update(target.id, {
    title: 'Searching by meaning',
    subcopy: 'What we learned building Pendulum with Ogilvy and WPP',
    author_name: 'William',
  });
  console.log('Updated: title, subcopy, author_name');

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
