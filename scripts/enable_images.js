import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });

  console.log('🖼️  Creating Image block for article content...\n');

  // Step 1: Check if ImageBlock model already exists
  const itemTypes = await client.itemTypes.list();
  let imageBlockType = itemTypes.find(t => t.api_key === 'image_block');
  
  if (!imageBlockType) {
    console.log('Creating ImageBlock model...');
    imageBlockType = await client.itemTypes.create({
      name: 'Image Block',
      api_key: 'image_block',
      modular_block: true, // This makes it a block, not a regular model
    });
    console.log(`✅ Created ImageBlock model (ID: ${imageBlockType.id})`);

    // Create the image field inside the block
    console.log('Creating image field...');
    await client.fields.create(imageBlockType.id, {
      label: 'Image',
      api_key: 'image',
      field_type: 'file',
      validators: {
        required: {},
        extension: {
          extensions: [],
          predefined_list: 'image',
        },
      },
    });
    
    // Create optional caption field
    console.log('Creating caption field...');
    await client.fields.create(imageBlockType.id, {
      label: 'Caption',
      api_key: 'caption',
      field_type: 'string',
      validators: {},
    });
    
    console.log('✅ Image block fields created');
  } else {
    console.log(`ImageBlock model already exists (ID: ${imageBlockType.id})`);
  }

  // Step 2: Get the Article model and content field
  const articleType = itemTypes.find(t => t.api_key === 'article');
  if (!articleType) {
    console.error('❌ Article model not found!');
    return;
  }

  const fields = await client.fields.list(articleType.id);
  const contentField = fields.find(f => f.api_key === 'content');

  if (!contentField) {
    console.error('❌ Content field not found!');
    return;
  }

  // Step 3: Update the content field to allow the ImageBlock
  console.log('\nUpdating content field to allow ImageBlock...');
  
  const currentBlockTypes = contentField.validators?.structured_text_blocks?.item_types || [];
  
  if (currentBlockTypes.includes(imageBlockType.id)) {
    console.log('ImageBlock already allowed in content field');
  } else {
    // Add ImageBlock to allowed block types
    const newValidators = {
      ...contentField.validators,
      structured_text_blocks: {
        item_types: [...currentBlockTypes, imageBlockType.id],
      },
    };

    await client.fields.update(contentField.id, {
      validators: newValidators,
    });
    
    console.log('✅ ImageBlock now allowed in content field!');
  }

  console.log('\n🎉 Done! Now you can add images in the article content:');
  console.log('   1. Open any article in DatoCMS');
  console.log('   2. In the Content editor, click "+" to add a block');
  console.log('   3. Select "Image Block"');
  console.log('   4. Upload your image and optionally add a caption');
}

run().catch(error => {
  console.error('❌ Error:');
  console.error(error.response ? JSON.stringify(error.response, null, 2) : error);
});
