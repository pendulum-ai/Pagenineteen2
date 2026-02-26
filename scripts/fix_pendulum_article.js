import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });

  console.log('Fixing Pendulum article...\n');

  const items = await client.items.list({ filter: { type: 'article' } });
  const target = items.find(a => a.slug && a.slug.includes('pendulum'));

  if (!target) {
    console.error('Pendulum article not found!');
    return;
  }

  console.log(`Found: "${target.title}" (id: ${target.id})`);
  console.log(`Current excerpt: "${target.excerpt}"`);

  // Insert "The problem" h2 heading at the start of the body content
  const content = structuredClone(target.content);
  const theProblemHeading = {
    type: 'heading',
    level: 2,
    children: [{ type: 'span', value: 'The problem' }],
  };
  content.document.children.unshift(theProblemHeading);

  console.log('Inserted "The problem" h2 at start of body.');
  console.log('New first 3 children:');
  content.document.children.slice(0, 3).forEach((c, i) => {
    const text = c.type === 'heading'
      ? c.children[0].value
      : c.children[0].value.substring(0, 60);
    console.log(`  ${i}: ${c.type} — "${text}"`);
  });

  // Update: fix excerpt, set correct content with h2
  await client.items.update(target.id, {
    excerpt: 'How semantic search transforms creative asset management for agencies at scale.',
    content,
  });

  console.log('\nUpdated excerpt and content.');

  // Republish
  if (target.meta.status === 'published') {
    await client.items.publish(target.id);
    console.log('Article republished.');
  }

  console.log('\n✅ Done!');
}

run().catch(error => {
  console.error('❌ Error:');
  console.error(error.response ? JSON.stringify(error.response, null, 2) : error);
});
