import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

const ARTICLE_DATA = {
  title: "A permanent platform for personal histories",
  slug: "a-permanent-platform-for-personal-histories", 
  date: "2025-04-01",
  tag: "Notes",
  excerpt: "Memory, narrative, and voice AI.",
  readingTime: "5 min read",
  content: `
Memory, narrative, and voice AI.

We believe there is an opportunity for a product grounded in how human lives become intelligible over time.

Experience on its own is incoherent. Meaning emerges only when events are remembered, revisited, and arranged into narrative. Identity forms through this process. Memory is not a static record but an active construction. A life becomes legible through story.

Despite this, personal history remains largely unformed. Lives are dispersed across fragments: photographs without context, recordings without continuity, anecdotes repeated until they lose shape. The raw material of memory exists in abundance. The systems to support narrative do not.

The idea we are exploring is a permanent platform for personal history. A system that supports the gradual construction of a life story through conversation. Recent advances in real-time voice AI, dynamic listening, and long-term memory make it possible to create an experience where reflection compounds, context persists, and meaning develops across time.

The ambition is to give personal history a durable structure.

Why now

This moment is shaped by a convergence of technological capability and cultural urgency.

On the technological side, conversational AI has crossed a critical threshold. Real-time voice systems can now engage fluidly with human speech, responding to cadence, tone, interruption, and silence. They can follow conversation as it unfolds rather than waiting for discrete prompts. Advances in streaming speech-to-text, low-latency language models, and expressive text-to-speech have made dialogue feel continuous rather than transactional.

At the same time, agentic systems have developed more sophisticated approaches to memory. Modern architectures can retain context across sessions, reference prior interactions, and build internal representations of a user over time. Memory is no longer limited to short-term recall. It can be structured, retrieved, and synthesized.

Together, these capabilities allow for a new kind of interaction. Conversation becomes longitudinal. Reflection compounds. A system can follow the arc of a life rather than isolated moments.

Alongside this technological shift is a demographic one. The Baby Boomer generation is entering its later years, carrying decades of lived experience. By 2025, there will be 74 million adults aged 65 and older in the U.S. At the same time, younger generations are increasingly turning to genealogy and family history as they search for identity, connection, and continuity. One generation holds the stories. The next is actively looking for them.

These forces meet at a moment when time itself feels compressed. Stories risk being lost because there has never been an infrastructure designed to hold them.

How it could work

The experience begins with a short phone conversation. Fifteen minutes. Once or twice a week. The format is familiar. The interaction feels ordinary.

Behind this simplicity sits a complex system. Real-time voice agents orchestrate speech recognition, language modeling, and speech synthesis in a continuous loop. Voice activity detection allows for interruption and silence. The system adapts dynamically to the user's pace and emotional tone.

Each conversation is processed through a memory layer that extracts themes, events, and relationships while preserving narrative context. Rather than storing transcripts as raw logs, the system builds a structured representation of a life over time. Prior sessions inform future questions. Unresolved threads resurface naturally. Contradictions are revisited rather than flattened.

In its earliest form, each conversation is transformed into a short narrative artifact delivered privately to the author or their family. Over time, these fragments are synthesized into broader story arcs. Written memoirs. Audio recollections. Hybrid formats that combine voice, text, and narrative structure.

The emphasis is continuity. Small memories are retained. Passing reflections find their place. Nothing needs to be captured all at once. What develops is an evolving account of a life, shaped through sustained reflection and dialogue.

Memory, identity, and meaning

Memory is dynamic. It is revised, reframed, and reinterpreted over time. Identity emerges through this ongoing process. We understand ourselves by returning to our experiences and telling them again, often differently.

Philosophy has long recognized this relationship. Consciousness is inseparable from narrative. Meaning arises through interpretation rather than accumulation.

As AI systems become more agentic, they encounter questions that have traditionally belonged to philosophy: values, understanding, alignment. Breakthroughs in computer science and AI have consistently emerged from deep philosophical thinking about the nature of computation, intelligence, language, and mind. If these systems are to align with human values, they must engage with meaning rather than surface behavior. Personal histories offer a uniquely rich foundation for this engagement. They contain what people did, how they understood their lives, and why those moments mattered.

Perhaps there is nothing more human than the stories we tell ourselves. As Margaret Atwood observed, storytelling is built into the human plan. We arrive with it.

Vision

The vision is to make storytelling a sustained practice rather than a retrospective act.

In the near term, this means supporting older adults as they reflect on their lives with continuity and care. In the long term, it suggests a future where families can engage with the voices, memories, and perspectives of those who came before them, creating a bridge across time.

This is an exploration of permanence in an era defined by ephemera. Of depth in a culture shaped by speed. Of narrative in a world dominated by fragments.

Voice AI gives us a way to formalize one of humanity's oldest practices. Conversation as reflection. Memory as structure. Story as the medium through which a life becomes intelligible.
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
