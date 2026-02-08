import { buildClient } from '@datocms/cma-client-node';

// AdminJournal token with write access
const API_TOKEN = 'd0beb732911976fa5efdcaaca1b3eb';

async function run() {
  const client = buildClient({ apiToken: API_TOKEN });

  console.log('📝 Adding "An immersive language learning company" to DatoCMS...\n');

  // Get the Article model
  const itemTypes = await client.itemTypes.list();
  const articleType = itemTypes.find(t => t.api_key === 'article');
  
  if (!articleType) {
    throw new Error('Article model not found in DatoCMS');
  }

  // Create the article with Structured Text content
  const article = await client.items.create({
    item_type: { type: 'item_type', id: articleType.id },
    
    title: 'An immersive language learning company',
    slug: 'an-immersive-language-learning-company',
    date: '2026-02-08',
    tag: 'Vision',
    excerpt: 'This journal outlines the vision for a new adaptive and immersive language learning product. It is built on the idea of reimagining language learning through personalized journeys tailored to each user\'s interests.',
    reading_time: '12 min read',
    
    content: {
      schema: 'dast',
      document: {
        type: 'root',
        children: [
          // Intro
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'This journal outlines the vision for a new adaptive and immersive language learning product. It is built on the idea of reimagining language learning through personalized journeys tailored to each user\'s interests. The system will combine conversational voice AI, image generation and adaptive agents to craft individualized curricula that meet learners at their specific proficiency level, continuously adapting to their learning style, interests, and progress; maximizing the learner’s knowledge' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'Unlike incumbent solutions, this approach will prioritize the culture of the language rather than focusing solely on rote grammar, vocabulary, and syntax instruction. Each day, learners will be immersed in a branching story of their own design, offering a deeply personalized experience while ensuring the content systematically guides them through standardized learning tracks. Designed specifically to help intermediate learners advance to fluency, the topics covered will align with CEFR levels A2 (conversational) through C2 (fluent).' }]
          },
          
          // The opportunity
          {
            type: 'heading',
            level: 3,
            children: [{ type: 'span', value: 'The opportunity in language learning.' }]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'span', value: 'Language is the instrument of culture. When we learn to speak a new language, we learn to see a bigger world. ' },
              { type: 'span', marks: ['strong'], value: 'But the way we learn new languages is broken.' },
              { type: 'span', value: ' We don’t learn to speak by memorizing vocabulary, drilling conjugations lists or playing daily games with a green owl. We learn by immersing ourselves in the language—by hearing it, seeing it, and using it as a vessel for connection.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'span', value: 'It is also not ' },
              { type: 'span', marks: ['emphasis'], value: 'why' },
              { type: 'span', value: ' we learn a new language. Language learning isn’t about memorization—it’s a means to real-world goals, from expanding career opportunities to a chance conversation with a stranger in a foreign city. Yet, most resources treat it like a puzzle to solve rather than something we absorb naturally when given the right context.' }
            ]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'The existing paradigm requires learners to conform to a rigid curriculum with predefined milestones and generic, one-size-fits all topics. AI changes this. It opens the opportunity for new methods of learning that bend the curriculum to the unique interests and motivations of each learner, and in doing so creating a new, bi-directional relationship between the tools we use to learn with our preexisting ideas and interests as humans.' }]
          },
          
          // A shift and expansion
          {
            type: 'heading',
            level: 3,
            children: [{ type: 'span', value: 'A shift and expansion in language learning.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'As with past technological platform shifts, the language learning market will witness both a shift and expansion. There is an opportunity to not only capture a share of the existing market, but also to expand it by introducing a more accessible, conversational, and personalized approach to language learning.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', marks: ['strong'], value: 'The digital language learning market is massive and growing.' }, { type: 'span', value: ' Estimated at $34B in 2025, it is projected to grow at a 21% CAGR to reach $74B by 2034. Yet, it remains dominated by outdated solutions:' }]
          },
          {
            type: 'list',
            style: 'bulleted',
            children: [
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Gamified mobile apps' },
                    { type: 'span', value: ' (Duolingo, Memrise) that focus on vocabulary drills but don’t build real fluency.' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Online tutor marketplaces' },
                    { type: 'span', value: ' (Preply, italki) that require expensive, cumbersome scheduling and don’t scale.' }
                  ]
                }]
              }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'span', value: 'The first opens the door for a more effective product aligned with the science of language acquisition. The second presents an opportunity to enhance accessibility and scale using AI. By focusing specifically on the online tutor market, rather than vocabulary and grammar applications, we not only avoid prematurely directly competing with existing language applications, but also allows us to follow the now well-trodden path of agentic companies that ' },
              {
                type: 'link',
                url: 'https://www.sarahtavel.com/p/a-few-sell-work-not-software-updated',
                children: [{ type: 'span', marks: ['emphasis'], value: 'sell work' }]
              },
              { type: 'span', marks: ['emphasis'], value: ' (language tutors)' },
              { type: 'span', marks: ['emphasis'], value: ', not software' },
              { type: 'span', value: '. This market alone is currently worth $12.7B and is projected to reach $23.73B by 2030.' }
            ]
          },
          
          // The Duolingo misconception
          {
            type: 'heading',
            level: 3,
            children: [{ type: 'span', marks: ['strong'], value: 'The Duolingo misconception.' }]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'span', value: 'Its easy to think that Duolingo is an immovable force in online language learning. In terms of share, the company represents only ~3% of the overall market (Q4 2024 revenue: $192M). In terms of focus, Duolingo is optimised for engagement, not actually learning a language. Anyone who has completed 300 day streak and still struggles to order a coffee in a foreign country knows this anecdotally. It is also validated by ' },
              {
                type: 'link',
                url: 'https://duolingo-papers.s3.amazonaws.com/reports/Duolingo_whitepaper_language_read_listen_A2_to_B1_2022.pdf?utm_source=chatgpt.com',
                children: [{ type: 'span', value: 'research' }]
              },
              { type: 'span', value: ': ' },
              { type: 'span', marks: ['strong'], value: 'most Duolingo users remain at the beginner to lower-intermediate level (A1-A2 CEFR). Despite long-term use, few reach fluency (B2 or higher).' }
            ]
          },
          {
            type: 'blockquote',
            children: [
              {
                type: 'paragraph',
                children: [
                  { type: 'span', value: '“I could read an article in a magazine, but then would lose my nerve trying to order a coffee. All those hours on Duolingo had given me a huge vocabulary but left me more or less mute.” ' },
                  {
                    type: 'link',
                    url: 'https://www.thedial.world/articles/news/issue-22/duolingo-language-learning-fluency',
                    children: [{ type: 'span', value: 'The Dial' }]
                  },
                  { type: 'span', value: '.' }
                ]
              }
            ]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'Fluency requires real-time word retrieval and response under pressure. The biggest opportunity isn’t just teaching a language—it’s training the brain to think and react like a native speaker. And while most people think speaking is the hardest part of language learning, listening is the real bottleneck—and no major tool fully addresses it. Studies show that even B2-C1 learners miss up to 50% of native speech due to speed, slang, and connected speech. The problem isn’t vocabulary; it’s the brain failing to process language at native speed. This can only be attained through real-time conversation.' }]
          },
          
          // Intersection of AI
          {
            type: 'heading',
            level: 3,
            children: [{ type: 'span', marks: ['strong'], value: 'The intersection of AI maturity and shifting consumer expectations.' }]
          },
          {
            type: 'list',
            style: 'bulleted',
            children: [
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Voice AI is nearly indistinguishable from human speech.' },
                    { type: 'span', value: ' Speech synthesis, NLP, and real-time conversation AI are now mature enough to replace scripted, robotic tutors.' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Multimodal AI enables near life-like image and video.' },
                    { type: 'span', value: ' This drives mixed-media production costs to near zero, democratizing content creation for education.' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Consumers are moving beyond gamification.' },
                    { type: 'span', value: ' Serious learners are outgrowing traditional apps but lack an affordable, effective alternative.' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'The human tutoring model is outdated.' },
                    { type: 'span', value: ' The $12.7B online tutoring market is expensive, fragmented, and inflexible.' }
                  ]
                }]
              }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'span', marks: ['strong'], value: 'The opportunity is to completely rethink language learning by grounding it in immersive and deeply personalized experiences through AI (without mentioning AI).' },
              { type: 'span', value: ' While real-time conversation is the most effective way to learn a language, generative AI unlocks entirely new learning experiences. From personalized multilingual podcasts and short stories, to conversations about our favorite artist’s new album and the book we are reading—to content discovered in a foreign language you haven’t been exposed to. At the same time, it allows us to simulate worlds with free-flowing dialogues between multiple speakers, creating an experience closer to travel than to two-way online tutorship while democratising one of the most effective ways to learn a language. Similar to ' },
              {
                type: 'link',
                url: 'https://new.computer/',
                children: [{ type: 'span', value: 'Dot' }]
              },
              { type: 'span', value: ', the solution will make use of memory and pattern recognition to create a continuous and compounding relationship with learners, rather than one-off, episodic drills. Multi-way, multimodal conversations become the foundation for personalized, multimodal learning.' }
            ]
          },
          
          // Language learning as world building
          {
            type: 'heading',
            level: 3,
            children: [{ type: 'span', value: 'Language learning as world building.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'Going beyond the paradigm of tutorship, we can think of language learning as world building. The opportunity here is to create immersive, personalized and ever-evolving digital worlds for language learning where users step into dynamic narratives tailored to their interests, personality, and fluency level. Instead of rote grammar drills or generic dialogues, learners engage in evolving, open-ended scenarios where they actively shape their journey through language. Learners aren’t passive recipients of lessons; they’re protagonists. Whether they become an organist in Paris in 2028, a caudillo in the Mexican Revolution, or, simply, themselves exploring a Spanish coastal town they’re about to visit, each world adapts to their learning needs. If a world grows stale, they can create a new one and continue their journey seamlessly.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'No existing solution does this because it wasn’t technologically possible until now. For the first time we have agentic systems with memory that can know as much about us as they do the real world, in real time. These systems can not just interact with you but interact with each other, creating free-flowing dialogues that become the basis of interactive content created for an N of 1. Daily content can be drawn from our calendars, social, playlists and saved articles rather than dogmatic dictation from CEFR guidelines. This involves:' }]
          },
          {
            type: 'list',
            style: 'bulleted',
            children: [
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Conversational AI' },
                    { type: 'span', value: ' as a core tool, enabling dynamic, personalized speech practice.' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Autonomous agents' },
                    { type: 'span', value: ' with lives of their own that develop alongside learning journeys.' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Generative media' },
                    { type: 'span', value: ' podcasts, short stories, articles, simulated scenarios that adapt to each learner’s journey.' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Personalized learning paths' },
                    { type: 'span', value: ' that integrate individual interests and real-world media.' }
                  ]
                }]
              }
            ]
          },
          
          // Distribution
          {
            type: 'heading',
            level: 3,
            children: [{ type: 'span', marks: ['strong'], value: 'Distribution remains the biggest challenge.' }]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'span', value: 'AI is ' },
              {
                type: 'link',
                url: 'https://www.nfx.com/post/ai-like-water',
                children: [{ type: 'span', value: 'more and more like water' }]
              },
              { type: 'span', value: '—models and infrastructure are becoming commodities. At the same time its never been harder, or more expensive, to scale through paid acquisition. Winning requires introducing novel learning paradigms enabled by generative AI, alongside viral, organic, and product-led growth loops. The opportunity is for a brand-forward language company that is as opinionated in its positioning as it is sophisticated in its backend. Early on, this means optimizing for a seemingly uncomfortably small market:' }
            ]
          },
          {
            type: 'list',
            style: 'bulleted',
            children: [
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Start with online tutoring users' },
                    { type: 'span', value: ': These learners already pay but want a better experience.' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Master two languages first' },
                    { type: 'span', value: ': French and Spanish are the second and third most learned language worldwide, with approximately 160 million active learners. Capturing 1% of these learners at $20/month would result in an ARR of ~$384 million before expanding further.' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Product-led growth through shareable content' },
                    { type: 'span', value: ': generated stories, podcasts, and learning experiences become organic acquisition loops.' }
                  ]
                }]
              }
            ]
          },
          
          // Audience
          {
            type: 'heading',
            level: 3,
            children: [{ type: 'span', marks: ['strong'], value: 'Audience and core users.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'The opportunity lies in serving intermediate to advanced learners (B1-C1)—where Duolingo users plateau and churn. This group has a clear incentive to pay for language progression, whether for professional or personal reasons. AI-driven adaptive learning can effectively replace tutors and rigid academic settings, offering targeted pronunciation refinement, natural fluency with colloquialisms, and deeper conversational engagement beyond memorized phrases.' }]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'span', value: 'This market is identified, underserved, and valuable. Predominantly female (~59%), it accounted for ' },
              { type: 'span', marks: ['strong'], value: '75% of online tutoring revenue in 2022' },
              { type: 'span', value: ', signaling strong demand for continued learning. Retention is naturally higher, as proficiency requires ongoing practice. Consumers are ' },
              { type: 'span', marks: ['strong'], value: 'willing to pay' },
              { type: 'span', value: ', with existing apps charging up to ' },
              { type: 'span', marks: ['strong'], value: '$20/month before trials' },
              { type: 'span', value: ', reflecting high price elasticity in the education and self-improvement space.' }
            ]
          },
          
          // Competition
          {
            type: 'heading',
            level: 3,
            children: [{ type: 'span', marks: ['strong'], value: 'Competition and incumbents.' }]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'span', value: 'The online language learning market is broad and can be divided into five primary segments. The below list includes both online platforms and incumbents in language education, a ' },
              {
                type: 'link',
                url: 'https://www.notion.so/Competitive-landscape-1950910f3a8480f6958ac390b6414ee3?pvs=21',
                children: [{ type: 'span', value: 'full list is here' }]
              },
              { type: 'span', value: '.' }
            ]
          },
          {
            type: 'list',
            style: 'bulleted',
            children: [
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Self-paced learning apps:' },
                    { type: 'span', value: ' Gamified apps (' },
                    { type: 'link', url: 'https://www.duolingo.com/', children: [{ type: 'span', value: 'Duolingo' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://www.memrise.com/', children: [{ type: 'span', value: 'Memrise' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://www.busuu.com/en-us', children: [{ type: 'span', value: 'Busuu' }] },
                    { type: 'span', value: ') vs. structured, traditional platforms (' },
                    { type: 'link', url: 'https://www.pimsleur.com/', children: [{ type: 'span', value: 'Pimsleur' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://mangolanguages.com/', children: [{ type: 'span', value: 'Mango Languages' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://fr.rosettastone.com/', children: [{ type: 'span', value: 'Rosetta Stone' }] },
                    { type: 'span', value: ').' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'AI-first startups:' },
                    { type: 'span', value: ' Real-time AI tutors (' },
                    { type: 'link', url: 'https://www.ycombinator.com/companies/issen', children: [{ type: 'span', value: 'Issen' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://www.talkio.ai/', children: [{ type: 'span', value: 'Talkio' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://www.loora.ai/', children: [{ type: 'span', value: 'Loora AI' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://www.speak.com/', children: [{ type: 'span', value: 'Speak' }] },
                    { type: 'span', value: '), pronunciation and accent coaching (' },
                    { type: 'link', url: 'https://elsaspeak.com/en/', children: [{ type: 'span', value: 'ELSA Speak' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://www.boldvoice.com/', children: [{ type: 'span', value: 'BoldVoice' }] },
                    { type: 'span', value: '), and personalized adaptive learning (' },
                    { type: 'link', url: 'https://makesyoufluent.com/', children: [{ type: 'span', value: 'MakesYouFluent' }] },
                    { type: 'span', value: ').' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Online tutoring platforms:' },
                    { type: 'span', value: ' 1:1 tutor marketplaces (' },
                    { type: 'link', url: 'https://www.italki.com/', children: [{ type: 'span', value: 'italki' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://preply.com/', children: [{ type: 'span', value: 'Preply' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://www.varsitytutors.com/', children: [{ type: 'span', value: 'Varsity Tutors' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://en.amazingtalker.com/', children: [{ type: 'span', value: 'AmazingTalker' }] },
                    { type: 'span', value: ') and group class platforms (' },
                    { type: 'link', url: 'https://www.lingoda.com/en/', children: [{ type: 'span', value: 'Lingoda' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://www.openenglish.com/', children: [{ type: 'span', value: 'Open English' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://www.rypeapp.com/', children: [{ type: 'span', value: 'Rype' }] },
                    { type: 'span', value: ').' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'Corporate language training:' },
                    { type: 'span', value: ' Businesses investing in employee development (' },
                    { type: 'link', url: 'https://www.berlitz.com/', children: [{ type: 'span', value: 'Berlitz' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://corporatelearning.ef.com/en/', children: [{ type: 'span', value: 'EF Corporate Solutions' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://voxy.com/', children: [{ type: 'span', value: 'Voxy' }] },
                    { type: 'span', value: ', ' },
                    { type: 'link', url: 'https://www.pearson.com/languages/hr-professionals/mondly-by-pearson.html', children: [{ type: 'span', value: 'Pearson\'s Mondly for Business' }] },
                    { type: 'span', value: ').' }
                  ]
                }]
              },
              {
                type: 'listItem',
                children: [{
                  type: 'paragraph',
                  children: [
                    { type: 'span', marks: ['strong'], value: 'MOOCs:' },
                    { type: 'span', value: ' Universities partnering with platforms like Coursera, edX, and FutureLearn, alongside traditional publishers (Cambridge, Oxford, McGraw-Hill).' }
                  ]
                }]
              }
            ]
          },
          
          // Separator logic - new section
          {
            type: 'heading',
            level: 3,
            children: [{ type: 'span', marks: ['strong'], value: 'A new story in language learning.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'Maybe there are no two forces more powerful in shaping our world than the stories we tell and the language we use to tell them.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'We believe it’s time for a new kind of story—one that is deeply personal yet stretches us beyond the limitations of our lived reality. Stories that immerse and connect us to languages and cultures outside our own.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'Language isn’t only a tool for communication—it’s an instrument of culture and self-expression. When we learn a new language, we learn to see a bigger world.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', marks: ['strong'], value: 'But the way we learn languages is broken.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'We don’t learn to speak through vocabulary drills, conjugation lists, or gamified streaks. We learn by living it—by hearing, seeing, and using it as a vessel for authentic connection. Yet most language learning resources treat it like a puzzle to solve rather than an experience to absorb, forcing learners into rigid curriculums and generic, one-size-fits-all topics.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'We’re at the edge of a technological shift with the potential to fundamentally change this. For the first time, we can bend learning to the individual—molding to each person’s interests, motivations, and fluency level. This transforms learning from a static process into a dynamic, evolving world where every interaction is personal, adaptive, and immersive.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'Amble is recreating how we learn through living language experiences grounded in native culture—ever evolving worlds shaped by open narratives and curiosity. A practice we return to, not out of obligation, but because it offers something deeper—a moment of progression and expansion.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', marks: ['strong'], value: 'Our mission is to open access to global culture through shared language.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'We’re a small team born out of the South Park Commons Founder Fellowship, backed by Shine Capital. We’ve built AI products from scratch at Spotify, led Product and Strategy teams at Google, and conducted research at Oxford and Imperial College on generative media and natural language processing. We’ve lived and worked in India, Iran, US, UK, China, Taiwan, Hong Kong, France, Italy, and Mexico. We’ve felt the magic in seeing the world in a new language, and the dissatisfaction with the available tools to learn them.' }]
          },
          {
            type: 'paragraph',
            children: [{ type: 'span', value: 'We’re currently hiring for a few select roles in research, engineering and design. If our mission resonates with you, we’d love to learn about your story.' }]
          }
        ]
      }
    }
  });

  console.log('✅ Article created successfully!\n');
  console.log(`   Title: ${article.title}`);
  console.log(`   Slug: ${article.slug}`);
  console.log(`   Status: ${article.meta.status}`);
  console.log(`   ID: ${article.id}`);
  
  // Publish the article
  console.log('\n📢 Publishing article...');
  await client.items.publish(article.id);
  console.log('✅ Article is now live on the website!');
}

run().catch(error => {
  console.error('❌ Error adding article:');
  console.error(error.response ? JSON.stringify(error.response, null, 2) : error);
});
