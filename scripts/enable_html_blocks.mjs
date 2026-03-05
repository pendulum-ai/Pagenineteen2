import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });

  console.log('📝 Creating HTML block for article content...\n');

  // Step 1: Check if HtmlBlock model already exists
  const itemTypes = await client.itemTypes.list();
  let htmlBlockType = itemTypes.find(t => t.api_key === 'html_block');

  if (!htmlBlockType) {
    console.log('Creating HtmlBlock model...');
    htmlBlockType = await client.itemTypes.create({
      name: 'HTML Block',
      api_key: 'html_block',
      modular_block: true,
    });
    console.log(`Created HtmlBlock model (ID: ${htmlBlockType.id})`);

    // Create the html_content field (text type for multiline HTML)
    console.log('Creating html_content field...');
    await client.fields.create(htmlBlockType.id, {
      label: 'HTML Content',
      api_key: 'html_content',
      field_type: 'text',
      validators: {
        required: {},
      },
    });

    console.log('HtmlBlock fields created');
  } else {
    console.log(`HtmlBlock model already exists (ID: ${htmlBlockType.id})`);
  }

  // Step 2: Get the Article model and content field
  const articleType = itemTypes.find(t => t.api_key === 'article');
  if (!articleType) {
    console.error('Article model not found!');
    return;
  }

  const fields = await client.fields.list(articleType.id);
  const contentField = fields.find(f => f.api_key === 'content');

  if (!contentField) {
    console.error('Content field not found!');
    return;
  }

  // Step 3: Update the content field to allow the HtmlBlock
  console.log('\nUpdating content field to allow HtmlBlock...');

  const currentBlockTypes = contentField.validators?.structured_text_blocks?.item_types || [];

  if (currentBlockTypes.includes(htmlBlockType.id)) {
    console.log('HtmlBlock already allowed in content field');
  } else {
    const newValidators = {
      ...contentField.validators,
      structured_text_blocks: {
        item_types: [...currentBlockTypes, htmlBlockType.id],
      },
    };

    await client.fields.update(contentField.id, {
      validators: newValidators,
    });

    console.log('HtmlBlock now allowed in content field!');
  }

  console.log(`\nHTML Block Type ID: ${htmlBlockType.id}`);
  console.log('Done!');
}

run().catch(error => {
  console.error('Error:');
  console.error(error.response ? JSON.stringify(error.response, null, 2) : error);
});
