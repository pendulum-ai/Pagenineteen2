
import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });
  
  console.log('🔄 Starting subtitle migration...');

  // 1. Fetch all articles
  // We need to fetch all pages if there are many, but for now 100 limit is enough (we have ~8)
  const items = await client.items.list({
    filter: {
      type: 'article'
    },
    page: { limit: 100 }
  });

  console.log(`Found ${items.length} articles.`);

  for (const item of items) {
    console.log(`\nProcessing: "${item.title}"`);
    
    const excerpt = item.excerpt;
    if (!excerpt) {
      console.log('  - No excerpt, skipping.');
      continue;
    }

    let content = item.content;
    
    // Check structure
    if (!content || !content.document || !content.document.children) {
        console.log('  - Invalid content structure, skipping.');
        continue;
    }

    const children = content.document.children;
    if (children.length === 0) {
        console.log('  - Empty content, skipping.');
        continue;
    }

    const firstNode = children[0];

    // We are looking for a paragraph
    if (firstNode.type !== 'paragraph') {
        console.log(`  - First node is ${firstNode.type}, skipping (not a paragraph).`);
        continue;
    }

    // Extract text from the first paragraph
    const nodeText = firstNode.children
        .map(child => child.value || '')
        .join('');

    // Normalize text: lowercase, remove non-alphanumeric chars
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const normExcerpt = normalize(excerpt);
    const normNodeText = normalize(nodeText);

    // Check if duplicate
    // We check if they heavily overlap (e.g. if the paragraph starts with the excerpt or vice versa)
    if (normNodeText.includes(normExcerpt) || normExcerpt.includes(normNodeText)) {
        console.log('  -> MATCH FOUND! Removing first paragraph...');
        
        // Remove the first child (paragraph)
        const newChildren = children.slice(1);
        
        // Prepare update payload
        const updatedContent = {
            ...content,
            document: {
                ...content.document,
                children: newChildren
            }
        };

        try {
            await client.items.update(item.id, {
                content: updatedContent
            });
            
            // Check status and republish if needed
            if (item.meta.status === 'published') {
                 await client.items.publish(item.id);
                 console.log('  -> Updated and Republished.');
            } else {
                 console.log('  -> Updated (remains in current status).');
            }

        } catch (e) {
            console.error('  !!! Error updating item:', e);
        }

    } else {
        console.log('  - First paragraph does NOT match excerpt.');
        console.log(`    Excerpt: "${normExcerpt.substring(0, 30)}..."`);
        console.log(`    Body:    "${normNodeText.substring(0, 30)}..."`);
    }
  }

  console.log('\n✅ Migration complete.');
}

run().catch(e => console.error(e));
