import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

const ARTICLE_DATA = {
  title: "The fluency gap",
  slug: "the-fluency-gap", 
  date: "2025-02-01",
  tag: "Thesis",
  excerpt: "The opportunity in immersive language learning.",
  readingTime: "5 min read",
  content: `
The opportunity in immersive language learning.

Language is the instrument of culture. When we learn to speak a new language, we learn to see a bigger world. The way we learn new languages, however, is broken.

We learn to speak by immersing ourselves in a language, by hearing it, seeing it, and using it as a vessel for connection. Language learning is a means to real-world goals, from expanding career opportunities to a chance conversation with a stranger in a foreign city. Yet most tools treat it like a puzzle to solve rather than something we absorb naturally when given the right context.

This is a structural problem.

The digital language learning market is estimated at $34 billion and projected to grow at a 21% CAGR through 2034. Yet it remains dominated by two models that fail learners in complementary ways: gamified mobile apps that focus on vocabulary drills but struggle to build real fluency, and online tutor marketplaces that are expensive, difficult to schedule, and unable to scale.

It's easy to assume Duolingo has a lock on this space. It doesn't. The company represents roughly 3% of overall market share. More importantly, Duolingo is optimized for engagement over actual language acquisition. Anyone who has maintained a 300-day streak and still struggles to order a coffee in a foreign city knows this. Research validates the intuition: most Duolingo users remain at beginner to lower-intermediate levels. Despite years of use, few reach fluency.

As one writer in The Dial described it, after years of daily practice they could read an article in a magazine but would lose their nerve trying to order a coffee. All those hours had given them a huge vocabulary but left them more or less mute.

This points to something fundamental about how we actually acquire language. Fluency requires real-time word retrieval and response under pressure. It requires the brain to process language at native speed. And while most people assume speaking is the hardest part, listening is the real bottleneck. Studies show that even upper-intermediate learners miss up to 50% of native speech due to speed, slang, and connected speech patterns. The bottleneck is the brain's ability to keep up. And this can only be trained through real-time conversation.

No major tool fully addresses this.

What AI makes possible

We are at the edge of a technological shift with the potential to fundamentally change how we learn languages. Voice AI is now nearly indistinguishable from human speech. Real-time conversational AI has matured enough to replace scripted, robotic tutors with something that feels closer to a real exchange. Multimodal AI enables near-lifelike image, audio, and video generation, driving mixed-media production costs toward zero. And consumers are ready. Serious learners are outgrowing traditional apps and looking for an affordable, effective alternative.

The online tutoring market alone is worth $12.7 billion and projected to reach $23.7 billion by 2030. This is the market we care about most. Tutoring works because conversation works. The problem is that it's expensive, fragmented, and inflexible. By focusing on replacing the tutor, we follow the path of agentic companies that sell work, and we avoid premature competition with entrenched vocabulary apps.

The opportunity is to completely rethink language learning by grounding it in immersive, deeply personalized experiences through AI.

Real-time conversation is the most effective way to learn a language. And generative AI unlocks entirely new modalities beyond conversation alone. Personalized multilingual podcasts and short stories. Discussions about a favorite artist's new album or the book we're reading. Content discovered in a foreign language we haven't been exposed to. Simulated dialogues between multiple speakers that feel closer to the texture of travel than to two-way online tutorship.

The existing paradigm requires learners to conform to a rigid curriculum with predefined milestones and generic, one-size-fits-all topics. AI changes this. It opens the possibility for learning methods that bend the curriculum to the individual, creating a new, bidirectional relationship between the tools we use to learn and our preexisting ideas and interests. Daily content can be drawn from our calendars, playlists, and saved articles rather than from standardized guidelines.

Central to all of this is memory. The best human tutors build a compounding understanding of their students over time. For the first time, AI systems can do the same, using memory and pattern recognition to create a continuous relationship with learners. Each session builds on the last. The system knows what you struggled with, what engaged you, and where you're ready to be pushed.

Where we focus

The biggest opportunity lies in serving intermediate to advanced learners, roughly B1 to C1 on the CEFR scale. This is precisely where Duolingo users plateau and churn. This group has a clear incentive to pay for progression, whether for professional advancement or personal goals. They're identifiable, underserved, and valuable: this segment accounted for 75% of online tutoring revenue in 2022.

Distribution remains the hardest problem for any new entrant. AI infrastructure is increasingly commoditized, and it has never been harder or more expensive to scale through paid acquisition. Winning requires introducing novel learning paradigms alongside viral, organic, and product-led growth. The content itself becomes the growth loop. Generated stories, podcasts, and learning experiences that are inherently shareable become organic acquisition channels.

Starting narrow matters. French and Spanish are the second and third most-learned languages worldwide, with approximately 160 million active learners between them. Mastering two languages first, for a specific audience, builds the foundation for everything that follows.

Amble

This is the opportunity we see, and why we're building Amble. A voice-first language learning product grounded in native culture, built on adaptive conversational AI, and designed to help intermediate learners advance toward fluency through living language experiences shaped by open narratives and curiosity.
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
