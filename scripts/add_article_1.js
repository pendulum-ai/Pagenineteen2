import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

const ARTICLE_DATA = {
  title: "A present future of creative software",
  slug: "a-present-future-of-creative-software", 
  date: "2024-10-01",
  tag: "Thesis",
  excerpt: "How we think about generative AI for creative tools.",
  readingTime: "4 min read",
  content: `
How we think about generative AI for creative tools.

Generative models provide raw resources to translate imagination into artifacts we can share, learn from, play with, and be inspired by. But without the right tools layered on top of them, they will continue to be just that: raw and unrefined.

New technological capabilities need new form factors. We are less interested in integrating generative models into paradigms that already exist. Instead, we are starting from first principles to explore software that powers AI-native creative workflows that could not have existed previously. Lightnote is our attempt to build a new creative canvas for a new creator class.

Taste and curation matter more now than ever

Many tools are being built to bring the cost of production to zero. This is useful, but it misses something important. Single-shot generation may work for rote forms of production, but creative practices require the ability to edit, refine, remix, and revisit. In a world of infinite generation, craft and curation become the differentiator. We believe the best tools become extensions of us, providing new ways to build, play, tweak, and wander, rather than replacing the process with a prompt box.

We are multimodal creatures

Text to image, video to audio, speech to text. This is how the technology underpinning the generative era works. Our minds work differently. Sound can inspire a physical sculpture and songs are written about colors. We think in shapes, dream in sounds, and speak in gestures. The tools we use to create should reflect this, making use of how we actually think rather than constricting it. This means incorporating multiple media formats to help guide ideation and conceive new creative outputs, treating multimodality as a first principle rather than a feature to be bolted on.

The creative process is a process

Text-based prompting can be a catalyst, fresh ink splashed onto a blank page. But we don't believe that AI on its own can move us in a way that reflects human craft. For this, we need new ways for human artistry and generative technology to engage in a process of co-creation. Mood boards, collaborative interfaces, configuration libraries, and version controls should be combined with generative capabilities rather than fractured into disparate workflows. This requires an approach to product development that recognizes human instinct as an integral input to meaningful expression, and provides the tools to make this possible.

Building in the liminal space

We are researchers, developers, designers, and creative technologists building in the liminal space between artistry and technology. We recognize that the present future of creative exploration is the culmination of thousands of years of artistic expression. From the possibility of a stretched raw canvas to the collaborative philosophy of open-source code, we are building on many disciplines that have existed across a wide range of creative practices before us.

Lightnote is where we explore what comes next.
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
