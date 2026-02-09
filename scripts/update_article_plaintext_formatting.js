import { buildClient } from '@datocms/cma-client-node';

// AdminJournal token
const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });
  const slug = 'agentic-workflows-for-creative-teams';

  console.log(`🔍 Fetching article with slug: ${slug}...`);

  const items = await client.items.list({
    filter: {
      type: 'article',
      fields: {
        slug: { eq: slug }
      }
    }
  });

  if (items.length === 0) {
    console.error('❌ Article not found');
    return;
  }

  const article = items[0];
  console.log('✅ Article found. stripping formatting...');

  const originalChildren = article.content.document.children;
  const newChildren = [];

  // Helper to strip marks from spans
  const stripMarks = (children) => {
    return children.map(child => {
        if (child.type === 'span') {
            const { marks, ...rest } = child; // Remove marks property
            return rest;
        }
        return child;
    });
  };

  for (const block of originalChildren) {
    if (block.type === 'heading') {
        // Convert Heading to Paragraph, NO BOLD
        newChildren.push({
            type: 'paragraph',
            children: stripMarks(block.children)
        });
    } else if (block.type === 'list') {
        // Convert List to individual paragraphs
        for (const listItem of block.children) {
            for (const itemChild of listItem.children) {
                 if (itemChild.type === 'paragraph') {
                    // Prepend HYPHEN instead of BULLET to be "lighter"
                    const textChildren = stripMarks(itemChild.children);
                    if (textChildren.length > 0) {
                        // Check if we already added a bullet/hyphen previously to avoid double piling
                        // The previous script added '• '. We should probably clean that up if we are re-running on the modified content?
                        // Wait, I am fetching the current state. The current state HAS '• ' in the paragraphs if I ran the previous script.
                        // BUT, the previous script converted the list block into paragraphs. 
                        // IF I am reading the *already modified* article, the structure is ALREADY paragraphs, not 'list'.
                        // Ah! If I fetch the *modified* article, I won't see 'list' formatting.
                        // I will see paragraphs starting with '• '.
                        
                        // However, the user might have reverted or I might be fetching an older version? 
                        // No, fetching the 'published' one.
                        
                        // If the previous script succeeded (it did), the article currently consists of PARAGRAPHS. 
                        // Some start with '• '. Some are formerly headings (now paragraphs with bold).
                        
                        // So I need to handle PARAGRAPHS that look like headings or list items.
                    }
                 }
            }
        }
    } else {
         // It's likely everything is a paragraph now if I ran the script. 
         // But I should handle the case where it's a paragraph.
    }
  }
  
  // STRATEGY CHANGE: 
  // Since the article was ALREADY modified to be all paragraphs (mostly), 
  // I need to iterate strictly over the CURRENT structure, which is likely just a list of paragraphs.
  // I need to:
  // 1. Remove 'marks' (bold) from any span.
  // 2. Replace '•' with '-' or remove it if desired. User said "thick points". changing to '-' is safer.
  
  const currentChildren = article.content.document.children;
  const cleanChildren = currentChildren.map(block => {
      if (block.type === 'paragraph') {
          const cleanSpans = block.children.map(child => {
              if (child.type === 'span') {
                  let newValue = child.value;
                  // Replace bullet with hyphen if present at start
                  if (newValue.startsWith('• ')) {
                      newValue = '- ' + newValue.substring(2);
                  }
                  
                  // Remove marks
                  return {
                      type: 'span',
                      value: newValue
                  };
              }
              return child;
          });
          
          return {
              type: 'paragraph',
              children: cleanSpans
          };
      }
      return block; // Should be only paragraphs now, but just in case
  });

  // Update the article
  const updatedArticle = await client.items.update(article.id, {
    content: {
      ...article.content,
      document: {
        ...article.content.document,
        children: cleanChildren
      }
    }
  });

  console.log('✅ Article updated locally.');

  // Publish
  console.log('📢 Publishing changes...');
  await client.items.publish(updatedArticle.id);
  console.log('✅ Article published successfully!');
  
}

run().catch(error => {
    console.error('❌ Error updating article:', error);
});
