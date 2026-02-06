import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = '71abe55ac2be66fcd23e8745748cc6';

async function findOrCreateModel(client, name, apiKey, draftMode = false) {
  const itemTypes = await client.itemTypes.list();
  const existing = itemTypes.find(t => t.api_key === apiKey);
  
  if (existing) {
    console.log(`Model "${name}" (${apiKey}) already exists. Skipping creation.`);
    return existing;
  }
  
  console.log(`Creating "${name}" model...`);
  return await client.itemTypes.create({
    name,
    api_key: apiKey,
    draft_mode_active: draftMode,
  });
}

async function findOrCreateField(client, modelId, fieldData) {
  const fields = await client.fields.list(modelId);
  const existing = fields.find(f => f.api_key === fieldData.api_key);
  
  if (existing) {
    console.log(`  Field "${fieldData.label}" already exists. Skipping.`);
    return existing;
  }
  
  console.log(`  Creating field "${fieldData.label}"...`);
  return await client.fields.create(modelId, fieldData);
}

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });

  console.log('🚀 Starting CMS initialization...\n');

  // Simplified Article Model (no Author, no Cover Image - per user request)
  const articleType = await findOrCreateModel(client, 'Article', 'article', true);

  // Title
  await findOrCreateField(client, articleType.id, {
    label: 'Title',
    api_key: 'title',
    field_type: 'string',
    validators: { required: {} },
  });

  // Slug
  await findOrCreateField(client, articleType.id, {
    label: 'Slug',
    api_key: 'slug',
    field_type: 'slug',
    validators: { required: {}, unique: {} },
  });

  // Publication Date
  await findOrCreateField(client, articleType.id, {
    label: 'Publication Date',
    api_key: 'date',
    field_type: 'date',
    validators: { required: {} },
  });

  // Tag
  await findOrCreateField(client, articleType.id, {
    label: 'Tag',
    api_key: 'tag',
    field_type: 'string',
    validators: { required: {} },
  });

  // Excerpt
  await findOrCreateField(client, articleType.id, {
    label: 'Excerpt',
    api_key: 'excerpt',
    field_type: 'text',
    validators: { required: {} },
  });

  // Reading Time
  await findOrCreateField(client, articleType.id, {
    label: 'Reading Time',
    api_key: 'reading_time',
    field_type: 'string',
    validators: { required: {} },
  });

  // Content (Structured Text) - with required validators per DatoCMS API
  await findOrCreateField(client, articleType.id, {
    label: 'Content',
    api_key: 'content',
    field_type: 'structured_text',
    validators: { 
      required: {},
      structured_text_blocks: { item_types: [] },
      structured_text_links: { item_types: [] },
    },
  });

  console.log('\n✅ CMS Setup Complete!');
}

run().catch(error => {
  console.error('❌ Error initializing CMS:');
  console.error(error.response ? JSON.stringify(error.response, null, 2) : error);
});
