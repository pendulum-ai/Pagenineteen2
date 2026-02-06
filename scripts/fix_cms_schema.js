import { buildClient } from '@datocms/cma-client-node';

// Using the AdminJournal token with full access
const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });

  console.log('🔧 Fixing CMS Schema...\n');

  // Get the Article model
  const itemTypes = await client.itemTypes.list();
  const articleType = itemTypes.find(t => t.api_key === 'article');

  if (!articleType) {
    console.error('❌ Article model not found!');
    return;
  }

  console.log(`Found Article model (ID: ${articleType.id})`);

  // Get all fields
  const fields = await client.fields.list(articleType.id);
  console.log('\nCurrent fields:');
  fields.forEach(f => {
    const isRequired = f.validators?.required ? '✓ Required' : '○ Optional';
    console.log(`  - ${f.label} (${f.api_key}): ${isRequired}`);
  });

  // Find cover_image and author fields
  const coverImageField = fields.find(f => f.api_key === 'cover_image');
  const authorField = fields.find(f => f.api_key === 'author');

  // Make cover_image optional (remove required validator)
  if (coverImageField) {
    console.log('\n📷 Updating Cover Image field to be OPTIONAL...');
    const newValidators = { ...coverImageField.validators };
    delete newValidators.required;
    
    await client.fields.update(coverImageField.id, {
      validators: newValidators,
    });
    console.log('  ✅ Cover Image is now optional');
  } else {
    console.log('\n📷 Cover Image field not found (already removed or never existed)');
  }

  // Make author optional (remove required validator)
  if (authorField) {
    console.log('\n👤 Updating Author field to be OPTIONAL...');
    const newValidators = { ...authorField.validators };
    delete newValidators.required;
    
    await client.fields.update(authorField.id, {
      validators: newValidators,
    });
    console.log('  ✅ Author is now optional');
  } else {
    console.log('\n👤 Author field not found (already removed or never existed)');
  }

  console.log('\n✅ Schema fix complete!');
  console.log('Now you can create articles without Cover Image and Author.');
}

run().catch(error => {
  console.error('❌ Error fixing schema:');
  console.error(error.response ? JSON.stringify(error.response, null, 2) : error);
});
