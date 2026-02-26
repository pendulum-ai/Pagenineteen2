import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

const paragraphs = [
  "In the early months of building Lightnote, we spent time with creative agencies and the brands they serve. We joined working sessions, watched decks take shape, and sat in the in-between moments where a team decides whether something feels ready. We went in thinking we were evaluating model quality. We left with a clearer view of how creative work actually moves.",
  "One pattern emerged quickly: agencies and brands experience the same tools through different pressures. Agencies are hired to propose a future. They need to explore directions quickly and present them in a way that feels intentional and defensible. Generative systems help when they expand the search space and compress the time between idea and articulation. Brands operate under a different constraint. They are responsible for shipping work repeatedly, across surfaces and markets. What matters to them is consistency, throughput, and reducing friction inside the production process. The same underlying capability serves both, but the workflow expectations diverge almost immediately.",
  "Customization surfaced in nearly every conversation, though what people meant by it was more nuanced than surface-level controls. Most teams already have a deep archive of campaigns, references, brand films, voice guidelines, and visual systems. They do not want to start from scratch with each prompt. They want a way to bring their accumulated context into the tool so outputs begin closer to their world. When generative systems can absorb and reflect that history, they move from novelty to infrastructure.",
  "Trust is equally foundational. Creative work contains early concepts, strategy, and assets that may never be published. Teams want clarity about how their data is handled and whether it contributes to broader training. Technical safeguards are essential, but so is clear communication. Adoption tends to follow confidence.",
  "Another insight was about curation. Creative professionals already collect references constantly. Screenshots, links, moodboards, internal libraries. Their process is less about isolated generations and more about building coherence over time. Tools that support this habit, that make it easy to gather inspiration and translate it into structured outputs, feel closer to the way studios actually operate.",
  "Design played a quieter but decisive role. Creative teams evaluate software the way they evaluate campaigns. Interface decisions signal what the product values. A system intended for professional use has to demonstrate care in its own construction. When it does, it becomes easier for teams to imagine bringing it into their workflow.",
  "Looking back on those months, the most useful lesson was that generative AI in creative environments is less about producing something impressive in a single click and more about fitting into an existing practice. The tools that endure will be the ones that understand how ideas move from exploration to presentation to production, and support that movement without disrupting it.",
];

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });
  const items = await client.items.list({ filter: { type: 'article' } });
  const article = items.find(a => a.slug === 'field-notes-in-creative-tooling');

  if (!article) {
    console.log('Not found. Articles:', items.map(a => a.slug));
    return;
  }

  console.log('Found:', article.title);
  console.log('Current excerpt (subtitle):', article.excerpt);

  const content = {
    schema: 'dast',
    document: {
      type: 'root',
      children: paragraphs.map(text => ({
        type: 'paragraph',
        children: [{ type: 'span', value: text }],
      })),
    },
  };

  await client.items.update(article.id, {
    title: 'Field notes in creative tooling',
    date: '2024-10-01',
    author_name: 'William',
    content,
  });

  if (article.meta.status === 'published') {
    await client.items.publish(article.id);
  }

  console.log('Updated: title, date (Oct 2024), author, and full body content.');
  console.log('Subtitle/excerpt kept as:', article.excerpt);
  console.log('Done.');
}

run().catch(error => {
  console.error('Error:', error.response ? JSON.stringify(error.response, null, 2) : error);
});
