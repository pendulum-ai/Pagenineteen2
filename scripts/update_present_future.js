import { buildClient } from '@datocms/cma-client-node';

const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

const paragraphs = [
  "Generative models have given creative software a new substrate. They can translate language into images, images into video, audio into text. They can compress what once took days into minutes. What they offer, at their core, is raw material. The question is what kind of environment we build around that material.",
  "We are less interested in inserting generative capabilities into familiar interfaces and calling it progress. Most existing creative tools were designed for a pre-generative world. They assume linear workflows, stable assets, and clear boundaries between formats. The shift underway feels deeper than a feature upgrade. It suggests new form factors, new sequences of interaction, and new relationships between people and software. Lightnote began as an attempt to explore what a creative canvas might look like if it were conceived with generative systems as a native ingredient rather than an add-on.",
  "Much of the conversation around AI in creative work focuses on reducing the cost of production. Lower friction is meaningful, especially for teams under pressure. At the same time, creative practice rarely unfolds in a single pass. Ideas are tested, set aside, returned to, combined with other fragments. Drafts accumulate. References pile up. The interesting moment is often not the first output but the third or the seventh, when intention becomes clearer. Software that supports this rhythm needs to make iteration natural and history visible. It needs to treat refinement as central rather than incidental.",
  "Another shift is about modality. The underlying models translate between text, image, audio, and video with increasing fluency. Human imagination already moves this way. A photograph can trigger a melody. A sound can suggest a color palette. A line of text can imply a spatial layout. Creative tools have traditionally separated these domains into specialized silos. Generative systems make it possible to let them inform one another more fluidly. When multimodality is treated as foundational, ideation can move in ways that feel closer to how people actually think.",
  "We have also come to see the creative process itself as the primary design constraint. Prompting is a powerful entry point, and it can unlock motion quickly. Sustained creative work, however, tends to involve dialogue, adjustment, and shared context. Moodboards, configuration libraries, collaborative surfaces, and versioning are not peripheral features. They are structures that allow people to carry intent forward over time. Integrating generative capabilities into these structures feels more aligned with how studios operate than isolating them behind a single input field.",
  "Building in this moment carries a certain humility. Generative software sits on top of long histories of artistic practice, craft, and technological experimentation. From stretched canvases to nonlinear editing suites to open-source frameworks, each wave of tools has reshaped how ideas move from imagination into the world. We see our role as participating in that lineage, asking what form creative software takes when generation is instantaneous and transformation across media is fluid.",
  "Lightnote is where we explore these questions. It is less a finished answer and more a working hypothesis about how creative tools might evolve when they are designed for the conditions of the present.",
];

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });
  const items = await client.items.list({ filter: { type: 'article' } });
  const article = items.find(a => a.slug === 'a-present-future-of-creative-software');

  if (!article) {
    console.log('Not found.');
    return;
  }

  console.log('Found:', article.title);

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
    date: '2024-11-01',
    author_name: 'William',
    content,
  });

  if (article.meta.status === 'published') {
    await client.items.publish(article.id);
  }

  console.log('Updated: date (Nov 2024), author (William), and full body content.');
  console.log('Done.');
}

run().catch(error => {
  console.error('Error:', error.response ? JSON.stringify(error.response, null, 2) : error);
});
