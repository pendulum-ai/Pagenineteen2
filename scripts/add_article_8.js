import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

const ARTICLE_DATA = {
  title: "Old problems, new systems",
  slug: "old-problems-new-systems", 
  date: "2026-01-01",
  tag: "Letter",
  excerpt: "Reflecting on the year ahead",
  readingTime: "3 min read",
  content: `
Reflecting on the year ahead

With every new year comes new reflections. This year we are staring at a horizon that seems to move ever closer, ever faster.

Amble, our language learning product, has grown 875% since launch, entirely through organic channels. Learners are coming and staying.

At the same time, the floor to building new products has never been lower. There has never been a better time to be a builder, and increasingly, everyone can be one. This is reshaping how we think about our role as builders, and in many ways has distilled why we believe Page Nineteen should exist.

The problems we care about are old ones. How people learn languages. How creative work gets made. How teams organize and access what they've already produced. These have existed for as long as people have worked and learned and created together. What's changed is that AI systems can now see, hear, speak, and reason across modalities at once. That convergence is what makes this moment interesting. The models themselves will keep changing. Human needs will not. The work that matters is designing the systems that connect one to the other.

This is the conviction that runs through everything we've built at Page Nineteen. Lightnote began from the idea that visual creativity could follow the same pattern of iteration and permutation as software development, if the tools were designed for it. Pendulum began from watching institutional knowledge disappear into scattered folders across an organization, and the realization that vision models coupled with semantic search could understand what someone was looking for better than they could articulate themselves. Amble began from the conviction that language learning needed immersion, and that voice AI had finally matured enough to make this possible. Three different domains. The same underlying approach: find a human problem worth solving, understand what new model capabilities make possible, and design the system that brings them together.

Each product sharpened our understanding of what it takes to put multimodal systems into production. And one lesson kept resurfacing: design must mirror model capability. With Pendulum, we removed traditional search filters entirely because the system underneath made them unnecessary. The interface became simpler as the models became smarter. With Amble, the product had to evolve alongside improvements in voice model latency and transcription accuracy. Every gain in performance opened a new design decision. The product couldn't be designed once and left alone. It had to bend with the technology. This is why we're a small team, and why that's deliberate. Product and design write system prompts. Backend engineers are fluent in Figma. When you are learning in real time what happens when new models meet production, a small team can bend the product around what it discovers rather than committing to a roadmap the technology has already outgrown.

We take the best available models and build the layer that turns them into products people love. The orchestration, the evaluation, the fine-tuning, the interfaces. That's what applied means to us, and that's what Page Nineteen is for.
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
