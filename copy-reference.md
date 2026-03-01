# Page Nineteen — Complete Copy Reference

> Extracted from pagenineteen.ai. All user-facing text across every page.

---

## Site-Wide

### SEO Meta Description

Page Nineteen is an applied multimodal AI lab based in London. We design, ship, and operate end-to-end AI systems — from creative tooling to large-scale asset intelligence. Projects: Amble, Pendulum, Lightnote.

### Open Graph

- **Title:** Page Nineteen — Applied Multimodal AI Lab
- **Description:** An applied multimodal AI lab based in London. We design, ship, and operate end-to-end AI systems — from creative tooling to large-scale asset intelligence.

### Twitter Card

- **Title:** Page Nineteen — Applied Multimodal AI Lab
- **Description:** An applied multimodal AI lab. Building at the intersection of language, vision, and sound.

### Navigation

- Home
- Journal
- Team

### Footer

- pagenineteen
- Connect: Twitter, LinkedIn, Email (hello@pagenineteen.ai)

---

## Home Page

### Hero

**Headline:** An applied multimodal AI lab

**Subline:** Building at the intersection of language, vision, and sound.

### Mission Section

**Heading:** Page Nineteen is a small team based in London designing AI products as unified systems.

**Body:** Across model orchestration, production infrastructure, and interface design.

### Projects Section

**Section title:** Projects

### "How We Operate" Scroll Section

**Intro title:** How we operate

**Frame 1 — Interaction defines architecture.**
We begin with behavior. How the system responds, adapts, and communicates determines how it is built.

**Frame 2 — Model orchestration.**
No single model defines the product. We select and combine models based on the behavior required.

**Frame 3 — Production constraints.**
Real systems operate under latency, cost, noise, and scale. We design within those constraints from the start.

**Frame 4 — Instrumentation.**
We instrument systems to understand how they behave in production and refine them based on real data.

**Frame 5 — Architecture.**
Models evolve quickly. We design systems that remain coherent as underlying capabilities change.

### Goal Section (currently hidden on site)

The best technology starts with very old human needs. From model to interface, it disappears into the experience.

---

## Projects Page

**Page title:** Projects

**Intro:** Each system below is live and in active development, serving as a proving ground for different aspects of the same underlying multimodal architecture.

### Amble

- **Tagline:** Real-time, personalized language learning
- **Description:** Amble gets to know each user, their proficiency and their interests, and bends curriculums around them. Built on real-time voice interfaces and adaptive learning driven by continuous feedback.
- **System Focus:**
  - Real-time conversational voice agents built on WebRTC
  - Orchestration across STT, LLMs, and TTS
  - Voice activity detection and real-time translation
  - Agentic content-production pipelines with auto-eval loops
- **Core Stack:** WebRTC, VAD, Whisper, LLM, TTS

### Pendulum

- **Tagline:** Multimodal asset search at enterprise scale
- **Description:** An enterprise system for indexing, organizing, and retrieving multimodal assets at scale. Built to handle millions of assets across images and text, with flexibility for downstream generative workflows. Developed with R/GA, WPP, and Kering.
- **System Focus:**
  - Metadata extraction using LLMs and vision-language models
  - Plain-text indexing combined with vector embeddings
  - Scalable distributed ingestion pipeline for media workloads
  - Natural-language retrieval integrated into multimodal RAG
- **Core Stack:** Vector DB, CLIP, LLM Metadata, DAG, Kandji

### Lightnote

- **Tagline:** Composable creative workflows for generative media
- **Description:** Lightnote explores what creative software looks like when AI is native to the interface rather than layered on top. A canvas-based environment for composing fine-tuned generative models and AI tools into repeatable creative workflows.
- **System Focus:**
  - Automated LoRA fine-tuning pipelines
  - Support for multiple model families (Flux, SDXL)
  - Workflow-specific tools: Inpainting, style transfer, background removal
  - Canvas-style interface for composing models and tools
- **Core Stack:** React Flow, Diffusers, LoRA, Flux, SDXL

---

## Team Page

**Page title:** Team

**Subtitle:** Integrated engineering, product, and applied ML.

**Meta description:** Meet the team behind Page Nineteen — a small, senior team with experience building and operating AI systems at scale.

### William Usdin

- **Role:** Founder & CEO
- **Focus:** Product, Strategy, Ops.
- **Previously:** Google, Oxford, Fulbright

### Louis Marion

- **Role:** Founding Engineer
- **Focus:** Machine Learning.
- **Previously:** Meta, Stanford, Darktrace

### Tarik Altuncu

- **Role:** Founding Engineer
- **Focus:** Machine Learning.
- **Previously:** Imperial College, PhD

### Altai Tseveen

- **Role:** Founding Engineer
- **Focus:** iOS and Android.
- **Previously:** Google, Meta

### Pedro Ferreira Martins

- **Role:** Founding Engineer
- **Focus:** Voice and NLP.
- **Previously:** Amazon Polly and Alexa

### Oliver Mayes

- **Role:** Founding Designer
- **Focus:** Design Engineer.
- **Previously:** Bumble, Motorway

---

## Journal Page

**Page title:** Journal

**Meta description:** Articles, notes, and updates from Page Nineteen — an applied multimodal AI lab based in London.

### Article Index

| Title | Date | Category | Read Time | Author | Excerpt |
|-------|------|----------|-----------|--------|---------|
| Earned simplicity | Jan 2026 | Letter | 5 min read | William | What we believe, January 2026 |
| The science behind Amble | Oct 2025 | Methods | 6 min read | Louis & William | The research and principles behind immersive language acquisition. |
| How we work | Mar 2025 | Culture | 3 min read | William | A founding team manifesto. |
| Voice AI and immersive language learning | Feb 2025 | Thesis | 5 min read | William | The opportunity in immersive language learning |
| A permanent platform for personal histories | Jan 2025 | Notes | 5 min read | William | Memory, narrative, and voice AI. |
| Searching by meaning | Dec 2024 | Case Study | 8 min read | William | How semantic search transforms creative asset management for agencies at scale. |
| A present future of creative software | Nov 2024 | Thesis | 4 min read | William | How we think about generative AI for creative tools. |
| Field notes in creative tooling | Oct 2024 | Notes | 4 min read | William | What we learned building creative tools for creative people. |

---

## Journal Articles — Full Text

### Earned simplicity

**Category:** Letter | **Date:** January 2026 | **Read time:** 5 min | **Author:** William

**Excerpt:** What we believe, January 2026

The models will keep changing. They will get faster, cheaper, more multimodal, more autonomous. Human needs will remain remarkably stable.

What's new is that AI can now see, hear, speak, and reason across modalities at once. The opportunity is designing products that translate that capability into something stable and useful.

Over the past two years, we've shipped multimodal products across consumer and enterprise. Each started from a human problem that predates the technology, and a moment when model capability made a new kind of product possible.

With Lightnote, it was the realization that image generation had matured enough to make creative iteration feel more like software development. With Pendulum, it was that vision models coupled with semantic search could understand what someone was looking for, even when they couldn't fully articulate it. With Amble, it was that voice latency and transcription accuracy had crossed the point where immersive language learning could become a real product rather than a research demo.

In each case, the product had to evolve alongside the models. Every gain in latency, accuracy, or reasoning changed what the interface should allow. Designing once and freezing a roadmap would have meant building for a version of reality that no longer existed. As capability moved faster, our planning cycles shortened. PRDs became lighter. We depended less on documents and more on shipped work.

This is one reason we have stayed intentionally small. When new capabilities emerge weekly, adaptability becomes an advantage. A small team can treat product design as a living system rather than a fixed artifact.

As the underlying systems grow more complex, the best products grow more minimal. The orchestration layer becomes the product.

Access to models is table stakes. The work lives in how they are composed and shaped: prompt architecture, model routing, memory design, interface judgment. It lives in deciding what the user should experience directly and what the system should quietly resolve in the background.

Turning probabilistic systems into experiences that feel intentional is an act of design, not engineering alone.

Foundation models will continue to evolve. What will not change is the set of human problems worth solving: how people learn, how they create, how they build on what already exists.

Simplicity is not a starting point. It is something that has to be earned by understanding the systems underneath.

---

### The science behind Amble

**Category:** Methods | **Date:** October 2025 | **Read time:** 6 min | **Author:** Louis & William

**Excerpt:** The research and principles behind immersive language acquisition.

#### Our Method

Amble is built on decades of research into how humans truly acquire language. It draws from the oldest and most effective methods and pairs them with modern technology to create a new kind of learning experience. What follows are the principles and insights that shape everything we build: the science, the psychology, and the convictions around how language becomes a part of us.

#### Learning through living

The first is that languages settle into the mind through lived experience. We learn by moving through stories, images, and ideas that carry meaning. Cognitive science describes the brain as a prediction system that absorbs regularities in what it hears and sees, building intuition over time (Rumelhart et al., 1986; Ellis, 2003). This view, often called connectionism, explains how structure emerges from exposure. Patterns come first. Rules can be named later.

Amble recreates that pathway for new languages. With steady contact and meaningful material, learners begin to feel the rhythm of a language and anticipate what comes next. Fluency grows from recognition and use.

#### Context and culture

Words stick when they belong to a scene, a feeling, or a purpose. Psycholinguistic research shows greater retention when vocabulary appears in context rather than in isolation (Nation, 2001; Webb, 2007). For that reason, Amble anchors learning in culture. Lessons draw from film, design, food, local history, and everyday conversation. A single word arrives inside a narrative, and the narrative anchors memory. Context turns exposure into understanding, and culture supplies depth.

#### Comprehensible input around personal interests

Stephen Krashen's Input Hypothesis describes progress through comprehensible input: language that is largely understandable with small, consistent stretches beyond the current level, known as i+1 (Krashen, 1985). That is the zone where the mind infers form and meaning with minimal strain. Amble is designed to keep you there. Each article, story, and conversation adapts to your level over time and aligns with your interests, since motivation strengthens attention and retention (Dornyei, 2009). Challenge remains present, yet always within reach.

#### Calm conditions for learning

Emotion shapes cognition. Krashen's Affective Filter Hypothesis shows that anxiety and performance pressure impede acquisition, while curiosity and comfort create conditions where input is processed deeply. Amble's interface is quiet and uncluttered. There are no leaderboards, competitions, or punitive feedback loops. The conversational experience itself is a low-stress space. Learners can speak freely without fear of mistakes. And by tailoring content to personal interests, Amble sustains enjoyment and positive emotion. The goal is a steady state of focus and ease that invites return. Calm is a learning design choice, not only a visual one.

#### From input to use

Understanding consolidates when it is used. Building on Krashen's idea of comprehensible input, Long's Interaction Hypothesis (1980, 1996) shows that meaning-focused communication helps learners negotiate understanding and internalize form. Complementing this, Swain's work on output (1985) highlights how producing language supports hypothesis testing and self-monitoring. Conversation therefore sits at the center of Amble. You can discuss an article, explore a topic that matters to you, or ask about a phrase that caught your attention. Guidance is gentle and timely. The flow of dialogue remains intact, so confidence grows alongside accuracy.

#### Remembering through repetition

Durable memory forms through spaced reencounters rather than massed review. Ebbinghaus mapped the forgetting curve; later work confirmed the power of spaced retrieval for long-term retention (Ebbinghaus, 1885; Cepeda et al., 2006). Amble applies spacing within context. Words and structures resurface across different scenes and emotional tones, so each reappearance adds another layer of meaning. Flashcards serve this goal as well, always tied back to sentences and moments, never drifting into isolated lists. Behind the scenes, Amble's scheduling is powered by a state-of-the-art algorithm (Su et al., 2022; Ye et al., 2023), which optimizes review timing based on current research in memory science.

#### A continuous loop

Every interaction in Amble advances a simple cycle. Exposure leads to recognition. Recognition leads to speaking. Speaking solidifies reinforcement. Spaced repetition consolidates what was learned, and the next moment of contact begins the cycle again. This loop mirrors the way we acquired our first language: through repeated, meaningful contact with a world that spoke to us.

Amble makes that process deliberate, personal, and cultural. Learn by living inside the language. Let context carry meaning. Stay in the right kind of challenge. Keep the mind calm. Speak to strengthen. Return to remember. Over time, the language feels less studied and more lived.

#### References

Rumelhart, D. E., Hinton, G. E., & McClelland, J. L. (1986). A general framework for parallel distributed processing. Parallel distributed processing: Explorations in the microstructure of cognition, 1(45-76), 26.

Ellis, N. C. (2003). Constructions, chunking, and connectionism: The emergence of second language structure. The handbook of second language acquisition, 63-103.

Nation, I. S., & Nation, I. S. P. (2001). Learning vocabulary in another language (Vol. 10, pp. 126-132). Cambridge: Cambridge university press.

Webb, S. (2007). Learning word pairs and glossed sentences: The effects of a single context on vocabulary knowledge. Language teaching research, 11(1), 63-81.

Krashen, S. D. (1985). The Input Hypothesis.

Dornyei, Z. (2013). The psychology of second language acquisition. Oxford University Press.

Long, M. H. (1980). Input, interaction, and second language acquisition. University of California, Los Angeles.

Long, M. H. (1996). The role of the linguistic environment in second language acquisition. The Handbook of second language acquisition (pp. 413-468).

Swain, M. (1985). Communicative Competence: Some Roles of Comprehensible Input and Comprehensible Output in its Development. in S. Gass and C. Madden (Eds.). Input in Second Language Acquisition (pp. 235-253). Rowley, MA: Newbury House.

Ebbinghaus, H. (1885). Uber das gedachtnis: untersuchungen zur experimentellen psychologie. Duncker & Humblot.

Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H. (2008). Spacing effects in learning: A temporal ridgeline of optimal retention. Psychological science, 19(11), 1095-1102.

Ye, J., Su, J., & Cao, Y. (2022, August). A stochastic shortest path algorithm for optimizing spaced repetition scheduling. In Proceedings of the 28th ACM SIGKDD conference on knowledge discovery and data mining (pp. 4381-4390).

Su, J., Ye, J., Nie, L., Cao, Y., & Chen, Y. (2023). Optimizing spaced repetition schedule by capturing the dynamics of memory. IEEE Transactions on Knowledge and Data Engineering, 35(10), 10085-10097.

---

### How we work

**Category:** Culture | **Date:** March 2025 | **Read time:** 3 min | **Author:** William

**Excerpt:** A founding team manifesto.

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

---

### Voice AI and immersive language learning

**Category:** Thesis | **Date:** February 2025 | **Read time:** 5 min | **Author:** William

**Subcopy:** What changes when AI can listen, remember, and adapt in real time

**Excerpt:** The opportunity in immersive language learning

Language is the instrument of culture. When we learn to speak a new language, we learn to see a bigger world. The way we learn new languages, however, is broken.

We don't learn to speak by memorizing vocabulary, drilling conjugation lists, or playing daily games. We learn by immersing ourselves in a language, by hearing it, seeing it, and using it as a vessel for connection. Language learning is a means to real-world goals, from expanding career opportunities to a chance conversation with a stranger in a foreign city. Yet most tools treat it like a puzzle to solve rather than something we absorb naturally when given the right context.

This is a structural problem, not a design one.

The market is dominated by two models that fail learners in complementary ways: gamified mobile apps that focus on vocabulary drills but don't build real fluency, and online tutor marketplaces that are expensive, difficult to schedule, and don't scale. Duolingo is optimized for engagement, not acquisition. Anyone who has maintained a 300-day streak and still struggles to order a coffee in a foreign city knows this. After years of daily practice, you can read a magazine article but lose your nerve trying to speak.

This points to something fundamental about how we actually acquire language. Fluency requires real-time word retrieval and response under pressure. It requires the brain to process language at native speed. And while most people assume speaking is the hardest part, listening is the real bottleneck. Studies show that even upper-intermediate learners miss up to 50% of native speech due to speed, slang, and connected speech patterns. The problem isn't vocabulary. It's the brain's ability to keep up. This can only be trained through real-time conversation.

No major tool fully addresses this.

#### What AI makes possible

Voice AI is now nearly indistinguishable from human speech. Real-time conversational AI has matured enough to replace scripted, robotic tutors with something that feels closer to a real exchange. And consumers are ready. Serious learners are outgrowing traditional apps and looking for something better.

Tutoring works because conversation works. The problem is that it's expensive, fragmented, and inflexible. The opportunity is to replace the tutor, not the flashcard — and to do it through immersive, deeply personalized experiences that weren't possible before.

Generative AI unlocks entirely new modalities beyond conversation alone. Personalized multilingual podcasts. Discussions about a favorite artist or the book you're reading. Content encountered in a foreign language for the first time. Simulated dialogues between multiple speakers that feel closer to the texture of travel than to two-way tutorship. The existing paradigm requires learners to conform to a rigid curriculum. AI inverts this. It bends the curriculum to the individual, drawing from your calendars, playlists, and interests rather than standardized guidelines.

Central to all of this is memory. The best human tutors build a compounding understanding of their students over time. AI can now do the same — using memory and pattern recognition to create a continuous relationship with learners rather than one-off episodic drills. Each session builds on the last. The product knows what you struggled with, what engaged you, and where you're ready to be pushed.

#### Where the opportunity sits

The biggest opportunity lies in serving intermediate to advanced learners — roughly B1 to C1. This is precisely where most apps plateau and churn. These learners have a clear incentive to pay for progression, whether for professional advancement or personal goals. They're identifiable, underserved, and motivated.

Starting narrow matters. French and Spanish alone account for approximately 160 million active learners worldwide. Mastering two languages first, for a specific audience, builds the foundation for everything that follows.

This is the opportunity Amble was built to address.

---

### A permanent platform for personal histories

**Category:** Notes | **Date:** January 2025 | **Read time:** 5 min | **Author:** William

**Subcopy:** An exploration of voice AI, long-term memory, and narrative

**Excerpt:** Memory, narrative, and voice AI.

We believe there is an opportunity for a product grounded in how human lives become intelligible over time.

Experience on its own is incoherent. Meaning emerges only when events are remembered, revisited, and arranged into narrative. Identity forms through this process. Memory is not a static record but an active construction. A life becomes legible through story.

Despite this, personal history remains largely unformed. Lives are dispersed across fragments: photographs without context, recordings without continuity, anecdotes repeated until they lose shape. The raw material of memory exists in abundance. The systems to support narrative do not.

The idea we are exploring is a permanent platform for personal history. A system that supports the gradual construction of a life story through conversation. Recent advances in real-time voice AI, dynamic listening, and long-term memory make it possible to create an experience where reflection compounds, context persists, and meaning develops across time.

The ambition is to give personal history a durable structure.

#### Why now

Conversational AI has crossed a critical threshold. Real-time voice systems can now engage fluidly with human speech, responding to cadence, tone, interruption, and silence. They can follow conversation as it unfolds rather than waiting for discrete prompts. Advances in streaming speech-to-text, low-latency language models, and expressive text-to-speech have made dialogue feel continuous rather than transactional.

At the same time, agentic systems have developed more sophisticated approaches to memory. Modern architectures can retain context across sessions, reference prior interactions, and build internal representations of a user over time. Memory is no longer limited to short-term recall. It can be structured, retrieved, and synthesised.

Together, these capabilities allow for a new kind of interaction. Conversation becomes longitudinal. Reflection compounds. A system can follow the arc of a life rather than isolated moments.

#### Proposed architecture

The experience begins with a short phone conversation. Fifteen minutes. Once or twice a week. The format is familiar. The interaction feels ordinary.

Underneath, a real-time voice stack manages streaming speech-to-text, turn-taking, interruption, and low-latency response generation. Text-to-speech renders replies with natural prosody so dialogue feels continuous rather than queued.

Each session feeds into a persistent memory layer. Instead of storing transcripts as flat logs, the system extracts structured representations: life events with temporal anchors, relationships between people and places, recurring themes, and open narrative threads. These are organised into a longitudinal narrative graph that evolves over time.

Before each new conversation, retrieval mechanisms surface relevant prior context. Earlier stories inform future questions. Unresolved references resurface naturally. Inconsistencies are flagged for gentle clarification rather than overwritten. Memory becomes cumulative rather than episodic.

After each session, the system generates a private narrative artifact: a short written reflection, an audio recap, or both. As the structured memory deepens, higher-order synthesis becomes possible. Individual conversations coalesce into chapters organised chronologically or thematically. Voice, text, and interpretation remain editable by the author, with corrections propagating back into the memory layer.

The emphasis is continuity. Small memories are retained. Passing reflections find their place. Meaning emerges gradually through sustained dialogue.

#### Memory and meaning

Memory is dynamic. It is revised, reframed, and reinterpreted over time. Identity emerges through this ongoing process. We understand ourselves by returning to our experiences and telling them again, often differently.

Philosophy has long recognised this relationship. Consciousness is inseparable from narrative. Meaning arises through interpretation rather than accumulation. If voice AI systems are to feel genuinely useful in this context, they must engage with meaning — not just transcription.

Personal histories offer a uniquely rich foundation for this. They contain not only what people did, but how they understood their lives, and why those moments mattered.

#### Where this could go

The vision is to make storytelling a sustained practice rather than a retrospective act.

In the near term, this means supporting people as they reflect on their lives with continuity and care. In the long term, it suggests a future where families can engage with the voices, memories, and perspectives of those who came before them.

Voice AI gives us a way to formalise one of humanity's oldest practices. Conversation as reflection. Memory as structure. Story as the medium through which a life becomes intelligible.

---

### Searching by meaning

**Category:** Case Study | **Date:** December 2024 | **Read time:** 8 min | **Author:** William

**Subcopy:** What we learned building Pendulum with Ogilvy and WPP

**Excerpt:** How semantic search transforms creative asset management for agencies at scale.

#### The problem

Creative agencies produce enormous volumes of work. Campaigns, brand assets, strategy documents, reference imagery — most of it organised by project code and date. That's fine for finding a specific deliverable. It's useless for finding "that warm-toned campaign from a few years ago that had a similar feel to what this new client is asking for."

That's not a metadata problem. It's a meaning problem. We built Pendulum with the teams at Ogilvy and WPP to address it.

#### How creatives look for things

We spent time with both teams understanding how they actually search. Three patterns kept showing up.

The first is conceptual. "Show me everything that feels editorial." This requires semantic understanding of image content, not keyword matching against filenames or tags.

The second is visual. A creative finds one image that's close to what they want and asks for more like it. That's image-to-image retrieval — comparing visual structure across an entire collection.

The third is chromatic. Palette turned out to be a first-class dimension of creative search. Teams working within brand guidelines need to find assets in a specific colour range, and no traditional search tool supports this natively.

These three modalities — text, image, and colour — became the foundation of Pendulum's search layer. All three needed to compose together. A creative might start with a text query, find something adjacent, pull up visually similar work, notice a colour thread, and filter by palette. Each interaction opens a new path into the collection rather than terminating in a result set.

#### Three layers of searchable information

Every image that enters Pendulum is processed through three independent workers.

The embedding worker generates vector representations using two models: CLIP for image-to-image similarity and Voyage for text-to-image retrieval. These serve different retrieval patterns. CLIP maps images into a shared visual space where proximity corresponds to perceptual similarity. Voyage maps text and images into a shared semantic space, allowing natural language queries to surface visually relevant results. We needed both because the two search modalities have fundamentally different geometries.

The tagging worker uses Anthropic's vision API to generate structured, human-readable descriptions of each image — subject matter, composition, style. These tags serve as both filter dimensions in the interface and as a structured metadata layer on top of the embedding space.

The colour worker extracts dominant colours, stored as hex values. This creates a retrieval axis entirely orthogonal to semantic meaning. Two images can share nothing visually but occupy the same palette — and in creative work, that's a real and useful connection.

The three workers run in parallel on Modal, scaling and failing independently. A reconciliation pass catches anything that slips through. The pipeline is source-agnostic by design — the same system processes partner assets regardless of origin or format.

#### Vector search at scale

The search backend runs on Postgres with pgvector, using HNSW indexes for approximate nearest neighbour search. Early in development, queries across our full index were taking between eleven and twenty-seven seconds.

The root cause was subtle. The HNSW index had been configured with one distance operator, but the queries were using another. Postgres was silently ignoring the index and falling back to sequential scans across every row. Once we aligned the operators, we needed to solve a second problem: filtered search. Vector indexes work best against the full dataset. Adding WHERE clauses — filtering by tag or source — degrades their effectiveness significantly.

We addressed this with CTE pre-filtering, narrowing the candidate set before the vector comparison rather than applying filters after. Combined with tuning ef_search to balance recall against speed, we reached sub-second queries across all three modalities, including filtered searches.

Balanced retrieval across sources required its own solution. A naive nearest-neighbour query returns whatever dominates the embedding space, skewing results toward whichever source is most heavily represented. We built balanced loading using per-source queries with row-number interleaving, ensuring search results reflect the diversity of the collection rather than statistical artefacts of the index.

#### Exploration over retrieval

A few interaction details that shaped the experience.

The tag system narrows suggestions based on current selection. Select a tag and subsequent suggestions show only tags that co-occur with it in the dataset. Filtering becomes exploratory — each choice reveals a more specific territory rather than simply reducing a list. Our partners described this as the "rabbit hole" they'd been looking for.

Similar images are pre-fetched the moment a card opens, so they load instantly when requested. Dominant-colour placeholders fill the grid while images load, drawn from the actual palette of each incoming image, preventing layout shift. A colour bar on the margin shows the chromatic distribution of current results — a quiet signal of the palette space you're browsing.

#### The public demo

Pendulum was developed against our partners' internal libraries. To demonstrate the system publicly, we assembled a corpus of roughly 302,000 images from three sources chosen to reflect the diversity of agency collections: Midjourney for AI-generated creative, Are.na for curated human collections, and WikiArt for art historical reference. Each required its own ingestion approach, and handling all three through the same pipeline validated the system's source-agnostic architecture.

#### What we learned

Building Pendulum in close partnership with Ogilvy and WPP shaped the product in ways we wouldn't have reached on our own. Colour as a search modality, the narrowing tag autocomplete, the emphasis on browsing over querying — these emerged from watching how creative teams actually work, not from technical assumptions.

The broader lesson is that creative search is a genuinely different kind of problem. The queries are imprecise by nature. Relevance is subjective and contextual. The best result isn't always the nearest neighbour — sometimes it's the unexpected connection that opens a new direction. We tried to build for that.

---

### A present future of creative software

**Category:** Thesis | **Date:** November 2024 | **Read time:** 4 min | **Author:** William

**Excerpt:** How we think about generative AI for creative tools.

Generative models have given creative software a new substrate. They can translate language into images, images into video, audio into text. They can compress what once took days into minutes. What they offer, at their core, is raw material. The question is what kind of environment we build around that material.

We are less interested in inserting generative capabilities into familiar interfaces and calling it progress. Most existing creative tools were designed for a pre-generative world. They assume linear workflows, stable assets, and clear boundaries between formats. The shift underway feels deeper than a feature upgrade. It suggests new form factors, new sequences of interaction, and new relationships between people and software. Lightnote began as an attempt to explore what a creative canvas might look like if it were conceived with generative systems as a native ingredient rather than an add-on.

Much of the conversation around AI in creative work focuses on reducing the cost of production. Lower friction is meaningful, especially for teams under pressure. At the same time, creative practice rarely unfolds in a single pass. Ideas are tested, set aside, returned to, combined with other fragments. Drafts accumulate. References pile up. The interesting moment is often not the first output but the third or the seventh, when intention becomes clearer. Software that supports this rhythm needs to make iteration natural and history visible. It needs to treat refinement as central rather than incidental.

Another shift is about modality. The underlying models translate between text, image, audio, and video with increasing fluency. Human imagination already moves this way. A photograph can trigger a melody. A sound can suggest a color palette. A line of text can imply a spatial layout. Creative tools have traditionally separated these domains into specialized silos. Generative systems make it possible to let them inform one another more fluidly. When multimodality is treated as foundational, ideation can move in ways that feel closer to how people actually think.

We have also come to see the creative process itself as the primary design constraint. Prompting is a powerful entry point, and it can unlock motion quickly. Sustained creative work, however, tends to involve dialogue, adjustment, and shared context. Moodboards, configuration libraries, collaborative surfaces, and versioning are not peripheral features. They are structures that allow people to carry intent forward over time. Integrating generative capabilities into these structures feels more aligned with how studios operate than isolating them behind a single input field.

Building in this moment carries a certain humility. Generative software sits on top of long histories of artistic practice, craft, and technological experimentation. From stretched canvases to nonlinear editing suites to open-source frameworks, each wave of tools has reshaped how ideas move from imagination into the world. We see our role as participating in that lineage, asking what form creative software takes when generation is instantaneous and transformation across media is fluid.

Lightnote is where we explore these questions. It is less a finished answer and more a working hypothesis about how creative tools might evolve when they are designed for the conditions of the present.

---

### Field notes in creative tooling

**Category:** Notes | **Date:** October 2024 | **Read time:** 4 min | **Author:** William

**Excerpt:** What we learned building creative tools for creative people.

In the early months of building Lightnote, we spent time with creative agencies and the brands they serve. We joined working sessions, watched decks take shape, and sat in the in-between moments where a team decides whether something feels ready. We went in thinking we were evaluating model quality. We left with a clearer view of how creative work actually moves.

One pattern emerged quickly: agencies and brands experience the same tools through different pressures. Agencies are hired to propose a future. They need to explore directions quickly and present them in a way that feels intentional and defensible. Generative systems help when they expand the search space and compress the time between idea and articulation. Brands operate under a different constraint. They are responsible for shipping work repeatedly, across surfaces and markets. What matters to them is consistency, throughput, and reducing friction inside the production process. The same underlying capability serves both, but the workflow expectations diverge almost immediately.

Customization surfaced in nearly every conversation, though what people meant by it was more nuanced than surface-level controls. Most teams already have a deep archive of campaigns, references, brand films, voice guidelines, and visual systems. They do not want to start from scratch with each prompt. They want a way to bring their accumulated context into the tool so outputs begin closer to their world. When generative systems can absorb and reflect that history, they move from novelty to infrastructure.

Trust is equally foundational. Creative work contains early concepts, strategy, and assets that may never be published. Teams want clarity about how their data is handled and whether it contributes to broader training. Technical safeguards are essential, but so is clear communication. Adoption tends to follow confidence.

Another insight was about curation. Creative professionals already collect references constantly. Screenshots, links, moodboards, internal libraries. Their process is less about isolated generations and more about building coherence over time. Tools that support this habit, that make it easy to gather inspiration and translate it into structured outputs, feel closer to the way studios actually operate.

Design played a quieter but decisive role. Creative teams evaluate software the way they evaluate campaigns. Interface decisions signal what the product values. A system intended for professional use has to demonstrate care in its own construction. When it does, it becomes easier for teams to imagine bringing it into their workflow.

Looking back on those months, the most useful lesson was that generative AI in creative environments is less about producing something impressive in a single click and more about fitting into an existing practice. The tools that endure will be the ones that understand how ideas move from exploration to presentation to production, and support that movement without disrupting it.

---

## 404 Page

**Status code:** 404

**Message:** System failure. Coordinates not found.

**Link:** Return to Index
