import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

const ARTICLE_DATA = {
  title: "The science behind Amble",
  slug: "the-science-behind-amble", 
  date: "2025-10-01",
  tag: "Methods",
  excerpt: "The research and principles behind immersive language acquisition.",
  readingTime: "6 min read",
  content: `
The research and principles behind immersive language acquisition.

Our Method

Amble is built on decades of research into how humans truly acquire language. It draws from the oldest and most effective methods and pairs them with modern technology to create a new kind of learning experience. What follows are the principles and insights that shape everything we build: the science, the psychology, and the convictions around how language becomes a part of us.

Learning through living

The first is that languages settle into the mind through lived experience. We learn by moving through stories, images, and ideas that carry meaning. Cognitive science describes the brain as a prediction system that absorbs regularities in what it hears and sees, building intuition over time (Rumelhart et al., 1986; Ellis, 2003). This view, often called connectionism, explains how structure emerges from exposure. Patterns come first. Rules can be named later.

Amble recreates that pathway for new languages. With steady contact and meaningful material, learners begin to feel the rhythm of a language and anticipate what comes next. Fluency grows from recognition and use.

Context and culture

Words stick when they belong to a scene, a feeling, or a purpose. Psycholinguistic research shows greater retention when vocabulary appears in context rather than in isolation (Nation, 2001; Webb, 2007). For that reason, Amble anchors learning in culture. Lessons draw from film, design, food, local history, and everyday conversation. A single word arrives inside a narrative, and the narrative anchors memory. Context turns exposure into understanding, and culture supplies depth.

Comprehensible input around personal interests

Stephen Krashen's Input Hypothesis describes progress through comprehensible input: language that is largely understandable with small, consistent stretches beyond the current level, known as i+1 (Krashen, 1985). That is the zone where the mind infers form and meaning with minimal strain. Amble is designed to keep you there. Each article, story, and conversation adapts to your level over time and aligns with your interests, since motivation strengthens attention and retention (Dörnyei, 2009). Challenge remains present, yet always within reach.

Calm conditions for learning

Emotion shapes cognition. Krashen's Affective Filter Hypothesis shows that anxiety and performance pressure impede acquisition, while curiosity and comfort create conditions where input is processed deeply. Amble's interface is quiet and uncluttered. There are no leaderboards, competitions, or punitive feedback loops. The conversational experience itself is a low-stress space. Learners can speak freely without fear of mistakes. And by tailoring content to personal interests, Amble sustains enjoyment and positive emotion. The goal is a steady state of focus and ease that invites return. Calm is a learning design choice, not only a visual one.

From input to use

Understanding consolidates when it is used. Building on Krashen's idea of comprehensible input, Long's Interaction Hypothesis (1980, 1996) shows that meaning-focused communication helps learners negotiate understanding and internalize form. Complementing this, Swain's work on output (1985) highlights how producing language supports hypothesis testing and self-monitoring. Conversation therefore sits at the center of Amble. You can discuss an article, explore a topic that matters to you, or ask about a phrase that caught your attention. Guidance is gentle and timely. The flow of dialogue remains intact, so confidence grows alongside accuracy.

Remembering through repetition

Durable memory forms through spaced reencounters rather than massed review. Ebbinghaus mapped the forgetting curve; later work confirmed the power of spaced retrieval for long-term retention (Ebbinghaus, 1885; Cepeda et al., 2006). Amble applies spacing within context. Words and structures resurface across different scenes and emotional tones, so each reappearance adds another layer of meaning. Flashcards serve this goal as well, always tied back to sentences and moments, never drifting into isolated lists. Behind the scenes, Amble's scheduling is powered by a state-of-the-art algorithm (Su et al., 2022; Ye et al., 2023), which optimizes review timing based on current research in memory science.

A continuous loop

Every interaction in Amble advances a simple cycle. Exposure leads to recognition. Recognition leads to speaking. Speaking solidifies reinforcement. Spaced repetition consolidates what was learned, and the next moment of contact begins the cycle again. This loop mirrors the way we acquired our first language: through repeated, meaningful contact with a world that spoke to us.

Amble makes that process deliberate, personal, and cultural. Learn by living inside the language. Let context carry meaning. Stay in the right kind of challenge. Keep the mind calm. Speak to strengthen. Return to remember. Over time, the language feels less studied and more lived.

References

Rumelhart, D. E., Hinton, G. E., & McClelland, J. L. (1986). A general framework for parallel distributed processing. Parallel distributed processing: Explorations in the microstructure of cognition, 1(45-76), 26.

Ellis, N. C. (2003). Constructions, chunking, and connectionism: The emergence of second language structure. The handbook of second language acquisition, 63-103.

Nation, I. S., & Nation, I. S. P. (2001). Learning vocabulary in another language (Vol. 10, pp. 126-132). Cambridge: Cambridge university press.

Webb, S. (2007). Learning word pairs and glossed sentences: The effects of a single context on vocabulary knowledge. Language teaching research, 11(1), 63-81.

Krashen, S. D. (1985). The Input Hypothesis.

Dornyei, Z. (2013). The psychology of second language acquisition. Oxford University Press.

Long, M. H. (1980). Input, interaction, and second language acquisition. University of California, Los Angeles.

Long, M. H. (1996). The role of the linguistic environment in second language acquisition. The Handbook of second language acquisition (pp. 413–468).

Swain, M. (1985). Communicative Competence: Some Roles of Comprehensible Input and Comprehensible Output in its Development. in S. Gass and C. Madden (Eds.). Input in Second Language Acquisition (pp. 235-253). Rowley, MA: Newbury House.

Ebbinghaus, H. (1885). Über das gedächtnis: untersuchungen zur experimentellen psychologie. Duncker & Humblot.

Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H. (2008). Spacing effects in learning: A temporal ridgeline of optimal retention. Psychological science, 19(11), 1095-1102.

Ye, J., Su, J., & Cao, Y. (2022, August). A stochastic shortest path algorithm for optimizing spaced repetition scheduling. In Proceedings of the 28th ACM SIGKDD conference on knowledge discovery and data mining (pp. 4381-4390).

Su, J., Ye, J., Nie, L., Cao, Y., & Chen, Y. (2023). Optimizing spaced repetition schedule by capturing the dynamics of memory. IEEE Transactions on Knowledge and Data Engineering, 35(10), 10085-10097.
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
