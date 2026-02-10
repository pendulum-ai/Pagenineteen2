import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

const ARTICLE_DATA = {
  title: "How we work",
  slug: "how-we-work", 
  date: "2025-03-01",
  tag: "Culture",
  excerpt: "A founding team manifesto.",
  readingTime: "3 min read",
  content: `
A founding team manifesto.

What follows started as a set of expectations we wrote for the founding team. Over time it became the closest thing we have to a company constitution: a living document, open to amendments, but rigorously and passionately upheld.

Extreme ownership and autonomy. Treat the company like your own. Because it is. This means constantly thinking about what drives us forward and then actually taking ownership of doing those things, from conception to completion. We often have high-level direction and priorities that each person needs to take and autonomously translate into the most important thing to work on.

Do the work. The most important thing to work on will most often be hard. Instead of being daunted by these challenges, we expect each other to be excited about solving them. To put in the work needed to tackle them while moving fast and keeping a high bar for quality.

Trust each other to do the work. We focus on impact over activity. We don't need to monitor how long each of us works or when we work. We don't have many calls. When we do, we expect each member of the team to show up fully, share perspective, and help move things forward. The only thing that matters is the value you create and the impact you have.

Write everything down. From PRDs and RFCs to ad-hoc decisions, our default is to document. We believe that writing is thinking. Clear documentation ensures our decisions are rooted in reason and data, and that context is never locked inside a single person's head.

Embrace change. Priorities will shift based on learnings. Features we build may be scrapped as we learn from our users and iterate on the product. We try to look at what we ship as a learning opportunity, as a means to the end of product-market fit instead of the end itself.

Embrace compression. Some weeks will be intense as we work long hours to get things over the line for a big client meeting or a scheduled feature launch. Embrace this.

Embrace decompression. We are a team of creatives. Everything we build will reflect this. We make time and space for each other's creative outlets because we believe this is sacred.

Radical candor. Provide feedback often, openly, and honestly. Give feedback with good intentions when sharing it, and always assume good intentions when receiving it. And never make a feedback sandwich.

Be a talent magnet. We are the product of who we work with. Constantly be thinking of who we could get on board to help us build something greater, someone who could raise the bar and be as passionate about building the company as we are.

Enjoy the process. This is the opportunity to create something new in the world. To build with a multidisciplinary team with a shared love for the intersections of art, science, language, and culture. Have fun. Take risks. Be kind.
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
