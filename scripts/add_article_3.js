import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

const ARTICLE_DATA = {
  title: "Field notes in creative tooling",
  slug: "field-notes-in-creative-tooling", 
  date: "2024-12-01",
  tag: "Notes",
  excerpt: "What we learned building creative tools for creative people.",
  readingTime: "4 min read",
  content: `
What we learned building creative tools for creative people.

We spent the early months of building Lightnote talking to creative agencies and the brands they serve. What follows is a set of observations from that process. Some confirmed what we expected. Others surprised us. All of them shaped how we think about building creative tools with generative AI.

Ideation and production are different problems

The ability to quickly ideate, permutate, and remix creative ideas provides value to both agencies and brands, but in different ways. Agencies are in the business of selling ideas. A tool that caters specifically to the ideation and presentation of ideas is valuable to them. Brands are in the business of selling goods and services. A tool that brings down the cost and time of creating marketing assets is what matters. The same technology serves both, but the workflows and expectations diverge quickly.

Customization is non-negotiable

Both brands and agencies need ways to create customized, on-brand assets without making edits in post-production or worrying about violating brand guidelines. This is true in both the ideation and production phases. The opportunity is to create a seamless way for users to upload preexisting media across any modality, whether video, text, image, or audio, into a brand hub that can contextualize and reflect their aesthetics in new generations. Generic outputs are a dead end.

Privacy and security are table stakes

Every customer we spoke to needed to know that whatever data they provide will not be used to train base models. This can be solved technically, but it also needs to be made clear in communications and product decisions. Trust is a prerequisite for adoption in this space.

Curation is a differentiator

In a world where every company will have access to the same base models, how we orchestrate them together and the data we provide them matters more than the models themselves. We need to build ways for people to curate their experience by pulling in ideas and images they encounter in the wild, and then translate that inspiration into actionable features within the product. At the same time, we need to curate our own distinct styles and workflows that provide value while differentiating from generic image generators. Taste matters.

Design is the product

We learned early that reaching parity with other players in creative tooling is not enough. Our users are extremely aesthetically minded. The interface has to mirror this. There is an opportunity to create something closer to the first luxury software offering in generative and creative tooling, something that treats design with the same seriousness as the underlying technology. In a market where capabilities converge quickly, the experience itself becomes the moat.

Copyright is unresolved but real

For large brands and the agencies that support them, knowing that models have been trained on licensed data matters. This is why some companies have traded speed and performance for legal clarity. For smaller brands and agencies, the importance of licensed models is less clear. The future of copyright, content licensing, and training data remains unsettled, but any serious creative tool needs a position on it.

The gap in the market is taste

The common thread across all of these learnings is that generative AI for creative professionals is not primarily a technology problem. The models are increasingly capable. The gap is in how they are presented, orchestrated, and designed for people who care deeply about craft. The companies that win in this space will be the ones that treat taste as infrastructure.
  `
};

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });
  
  console.log(`📝 Adding "${ARTICLE_DATA.title}"...`);

  const itemTypes = await client.itemTypes.list();
  const articleType = itemTypes.find(t => t.api_key === 'article');
  if (!articleType) throw new Error('Article model not found');

  const paragraphs = ARTICLE_DATA.content
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  const dastChildren = paragraphs.map(text => {
    return {
      type: 'paragraph',
      children: [
        {
          type: 'span',
          value: text
        }
      ]
    };
  });

  const article = await client.items.create({
    item_type: { type: 'item_type', id: articleType.id },
    title: ARTICLE_DATA.title,
    slug: ARTICLE_DATA.slug,
    date: ARTICLE_DATA.date,
    tag: ARTICLE_DATA.tag,
    excerpt: ARTICLE_DATA.excerpt,
    reading_time: ARTICLE_DATA.readingTime,
    content: {
      schema: 'dast',
      document: {
        type: 'root',
        children: dastChildren
      }
    }
  });

  console.log('✅ Article created!');
  
  await client.items.publish(article.id);
  console.log('📢 Published!');
}

run().catch(e => console.error(e));
