import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

const ARTICLE_DATA = {
  title: "A home for ideas",
  slug: "a-home-for-ideas", 
  date: "2024-11-01",
  tag: "Thesis",
  excerpt: "Agentic workflows for creative teams.",
  readingTime: "5 min read",
  content: `
Agentic workflows for creative teams

Creative teams have always generated more than they can organize. Campaigns, strategies, pitch decks, brand guidelines, video assets, research documents, client feedback. The volume of work produced by a creative organization is enormous, and it compounds over time. Every project adds to a body of knowledge that, in theory, should make the next project better.

In practice, most of that knowledge is lost. It sits in folders no one opens, scattered across platforms that don't talk to each other. The person who remembers where something lives leaves the company, and with them goes the institutional memory. A brief gets written from scratch because no one can find the one from six months ago. A pitch deck is rebuilt because the old one is buried in someone's Google Drive. The same questions get answered again and again.

This isn't a new problem. Creative organizations have always struggled with the gap between what they've made and what they can access. What's changed is the scale. The proliferation of tools and formats has made the problem exponentially worse. Teams now work across dozens of platforms, producing content in every medium, and the systems meant to organize it have not kept pace.

The librarian, not the search engine

The instinct is to solve this with better search. Index everything, make it queryable, move on. But search alone doesn't work for creative teams because the problem isn't just retrieval. It's context. A creative director doesn't need to find a file. They need to surface the right insight at the right moment, understand why a previous campaign worked, pull together a brief from fragments of past work, or adapt an existing strategy for a new market. This requires something closer to a librarian than a search engine. Someone who knows the archive, understands the present need, and can draw the connection between the two.

Multimodal AI makes this possible for the first time. Systems that can read, watch, and listen across formats. That can understand the content of a video, the structure of a presentation, and the meaning of a strategy document, and hold all of it in a single, queryable layer. This isn't search with better filters. It's a fundamentally different relationship between a team and its collective body of work.

Past, present, future

We think about Pendulum across three time horizons.

The first is the past. Creative work has lasting value, but it's hard to find and harder to know which context makes it relevant. Pendulum ingests and organizes an entire knowledge base across formats, from images and video to documents and audio, into a unified semantic layer. Teams can ask natural language questions and retrieve what they need, whether that's a specific asset or a pattern across years of campaigns.

The second is the present. A team's collective knowledge shouldn't only live in the archive. It should be alive and available in the tools they already use: Slack, Google Workspace, Dropbox. Pendulum brings past insights into current workflows, making onboarding, ideation, content localization, and client feedback faster by connecting them to everything the organization already knows.

The third is the future. Past work doesn't just inform new projects. It can become the raw material for them. Pendulum transforms collections of past campaigns, strategies, and insights into composable artifacts: briefs, pitch decks, RFP responses, client updates. What's already been created becomes the foundation for what comes next.

Why creative teams

The opportunity here extends well beyond creative agencies. Any organization that produces mixed-media work at scale faces the same fundamental challenge of institutional knowledge slipping through the cracks. We started with creative teams because the problem is acute and the workflows are well-defined. These are organizations where the gap between what's been produced and what's accessible is felt daily, where the cost of rebuilding from scratch is measured in hours and missed opportunities, and where the value of resurfacing the right piece of past work at the right moment is immediately clear.

Creative agencies also sit at the intersection of every format: video, image, text, audio, presentation, strategy document. If we can build an intelligent layer that works across all of these, we believe we can build something that generalizes.

We're excited to be building Pendulum alongside the teams at Kering, Ogilvy, WPP, and R/GA.
  `
};

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });
  
  console.log(`📝 Adding "${ARTICLE_DATA.title}"...`);

  const itemTypes = await client.itemTypes.list();
  const articleType = itemTypes.find(t => t.api_key === 'article');
  if (!articleType) throw new Error('Article model not found');

  // Convert plain text to paragraphs, removing any accidental '##' or markdown remnants if needed
  // (Data is already cleaned in the string above)
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
