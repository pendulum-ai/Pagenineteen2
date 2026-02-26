import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

const sections = [
  // Opening paragraphs (before first h2)
  { type: 'paragraph', text: "We believe there is an opportunity for a product grounded in how human lives become intelligible over time." },
  { type: 'paragraph', text: "Experience on its own is incoherent. Meaning emerges only when events are remembered, revisited, and arranged into narrative. Identity forms through this process. Memory is not a static record but an active construction. A life becomes legible through story." },
  { type: 'paragraph', text: "Despite this, personal history remains largely unformed. Lives are dispersed across fragments: photographs without context, recordings without continuity, anecdotes repeated until they lose shape. The raw material of memory exists in abundance. The systems to support narrative do not." },
  { type: 'paragraph', text: "The idea we are exploring is a permanent platform for personal history. A system that supports the gradual construction of a life story through conversation. Recent advances in real-time voice AI, dynamic listening, and long-term memory make it possible to create an experience where reflection compounds, context persists, and meaning develops across time." },
  { type: 'paragraph', text: "The ambition is to give personal history a durable structure." },

  // Why now
  { type: 'heading', level: 2, text: "Why now" },
  { type: 'paragraph', text: "Conversational AI has crossed a critical threshold. Real-time voice systems can now engage fluidly with human speech, responding to cadence, tone, interruption, and silence. They can follow conversation as it unfolds rather than waiting for discrete prompts. Advances in streaming speech-to-text, low-latency language models, and expressive text-to-speech have made dialogue feel continuous rather than transactional." },
  { type: 'paragraph', text: "At the same time, agentic systems have developed more sophisticated approaches to memory. Modern architectures can retain context across sessions, reference prior interactions, and build internal representations of a user over time. Memory is no longer limited to short-term recall. It can be structured, retrieved, and synthesised." },
  { type: 'paragraph', text: "Together, these capabilities allow for a new kind of interaction. Conversation becomes longitudinal. Reflection compounds. A system can follow the arc of a life rather than isolated moments." },

  // Proposed architecture
  { type: 'heading', level: 2, text: "Proposed architecture" },
  { type: 'paragraph', text: "The experience begins with a short phone conversation. Fifteen minutes. Once or twice a week. The format is familiar. The interaction feels ordinary." },
  { type: 'paragraph', text: "Underneath, a real-time voice stack manages streaming speech-to-text, turn-taking, interruption, and low-latency response generation. Text-to-speech renders replies with natural prosody so dialogue feels continuous rather than queued." },
  { type: 'paragraph', text: "Each session feeds into a persistent memory layer. Instead of storing transcripts as flat logs, the system extracts structured representations: life events with temporal anchors, relationships between people and places, recurring themes, and open narrative threads. These are organised into a longitudinal narrative graph that evolves over time." },
  { type: 'paragraph', text: "Before each new conversation, retrieval mechanisms surface relevant prior context. Earlier stories inform future questions. Unresolved references resurface naturally. Inconsistencies are flagged for gentle clarification rather than overwritten. Memory becomes cumulative rather than episodic." },
  { type: 'paragraph', text: "After each session, the system generates a private narrative artifact: a short written reflection, an audio recap, or both. As the structured memory deepens, higher-order synthesis becomes possible. Individual conversations coalesce into chapters organised chronologically or thematically. Voice, text, and interpretation remain editable by the author, with corrections propagating back into the memory layer." },
  { type: 'paragraph', text: "The emphasis is continuity. Small memories are retained. Passing reflections find their place. Meaning emerges gradually through sustained dialogue." },

  // Memory and meaning
  { type: 'heading', level: 2, text: "Memory and meaning" },
  { type: 'paragraph', text: "Memory is dynamic. It is revised, reframed, and reinterpreted over time. Identity emerges through this ongoing process. We understand ourselves by returning to our experiences and telling them again, often differently." },
  { type: 'paragraph', text: "Philosophy has long recognised this relationship. Consciousness is inseparable from narrative. Meaning arises through interpretation rather than accumulation. If voice AI systems are to feel genuinely useful in this context, they must engage with meaning \u2014 not just transcription." },
  { type: 'paragraph', text: "Personal histories offer a uniquely rich foundation for this. They contain not only what people did, but how they understood their lives, and why those moments mattered." },

  // Vision
  { type: 'heading', level: 2, text: "Vision" },
  { type: 'paragraph', text: "The vision is to make storytelling a sustained practice rather than a retrospective act." },
  { type: 'paragraph', text: "In the near term, this means supporting people as they reflect on their lives with continuity and care. In the long term, it suggests a future where families can engage with the voices, memories, and perspectives of those who came before them." },
  { type: 'paragraph', text: "Voice AI gives us a way to formalise one of humanity\u2019s oldest practices. Conversation as reflection. Memory as structure. Story as the medium through which a life becomes intelligible." },
];

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });
  const items = await client.items.list({ filter: { type: 'article' } });
  const article = items.find(a => a.slug === 'a-permanent-platform-for-personal-histories');

  if (!article) {
    console.log('Not found.');
    return;
  }

  console.log('Found:', article.title);

  const children = sections.map(s => {
    if (s.type === 'heading') {
      return {
        type: 'heading',
        level: s.level,
        children: [{ type: 'span', value: s.text }],
      };
    }
    return {
      type: 'paragraph',
      children: [{ type: 'span', value: s.text }],
    };
  });

  const content = {
    schema: 'dast',
    document: { type: 'root', children },
  };

  await client.items.update(article.id, {
    title: 'A permanent platform for personal histories',
    subcopy: 'An exploration of voice AI, long-term memory, and narrative',
    author_name: 'William',
    content,
  });

  if (article.meta.status === 'published') {
    await client.items.publish(article.id);
  }

  console.log('Updated: subcopy, author (William), and full body content.');
  console.log('Done.');
}

run().catch(error => {
  console.error('Error:', error.response ? JSON.stringify(error.response, null, 2) : error);
});
