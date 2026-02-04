export const articles = [
  ...[
    {
      id: 1,
      slug: "immersive-language-learning",
      title: "An immersive language learning company",
      date: "Dec 2025",
      tag: "Vision",
      excerpt: "Why we believe the next generation of language learning won't be flashcards, but immersive, real-time conversations with AI agents that understand context and nuance.",
      author: {
        name: "Elena Rodriguez",
        role: "Founder & CEO",
        avatar: "ER"
      },
      coverImage: "https://images.unsplash.com/photo-1616428236717-d5cb35560966?q=80&w=2600&auto=format&fit=crop",
      contentBlocks: [
        { type: 'paragraph', text: "The way we learn languages hasn't fundamentally changed in decades. We memorize lists, fill in blanks, and struggle to translate thoughts in real-time. But language isn't just code to be deciphered; it's a living, breathing connection that requires a different approach to mastery." },
        { type: 'heading', text: "The Immersive Hypothesis" },
        { type: 'paragraph', text: "Our core thesis is simple: immersion is the only way to true fluency. But physical immersion is expensive and inaccessible to most. We are building the digital equivalent—a space where context, tone, and reaction matter more than syntax tables." },
        { type: 'quote', text: "We don't learn language to pass tests. We learn it to connect." },
        { type: 'paragraph', text: "When you analyze the success rates of traditional classroom instruction versus field exposure, the data is stark. The brain doesn't store vocabulary in isolation; it stores it in semantic clusters attached to emotional memory. If you remove the emotion and the environment, you remove the adhesive that makes learning stick." },
        { type: 'heading', text: "Building for Presence" },
        { type: 'paragraph', text: "We're using low-latency audio models to create conversations that flow naturally. No awkward pauses, no perfect grammar requirements—just communication. The goal is to induce a 'flow state' where the learner stops translating in their head and starts thinking in the target language." },
        { type: 'paragraph', text: "This requires a system capable of understanding not just what you said, but what you meant. Our agents monitor hesitation, tone, and self-correction to adjust the difficulty dynamically, keeping you exactly at the edge of your ability—the zone of proximal development." },
        { type: 'heading', text: "The Future of Fluency" },
        { type: 'paragraph', text: "We envision a world where language barriers are dissolved not by translation devices, but by rapid, accessible upskilling. Imagine an interface that feels less like a textbook and more like a portal to another culture. That is what we are building." }
      ],
      readingTime: "4 min read"
    },
    {
      id: 2,
      slug: "lightnote-creative-software",
      title: "Lightnote - a present future of creative software",
      date: "Nov 2025",
      tag: "Product",
      excerpt: "Exploring the shift from 'prompting' to 'composing'. How creative professionals need interfaces that allow for iterative refinement rather than slot-machine generation.",
      author: {
        name: "Marcus Thorne",
        role: "Head of Product",
        avatar: "MT"
      },
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2600&auto=format&fit=crop",
      content: `
        <p>Generative AI has flooded the market with "magic buttons". Click a button, get an image. Click a button, get a blog post. But for professionals, this isn't enough.</p>
        <h2>Control vs. Chaos</h2>
        <p>Professionals need steerability. They need to be able to reach into the latent space and tweak a specific shadow, change a specific tone, or adjust the pacing of a specific sentence.</p>
        <p>Lightnote is our answer to this. It's a composable interface for generative flows.</p>
      `,
      readingTime: "6 min read"
    },
    {
      id: 3,
      slug: "agentic-workflows",
      title: "Agentic workflows for creative teams",
      date: "Oct 2025",
      tag: "Systems",
      excerpt: "How we implement evaluation loops in production. Moving beyond simple chains to agents that can critique their own outputs.",
      author: {
        name: "Priya Patel",
        role: "Lead Engineer",
        avatar: "PP"
      },
      coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2600&auto=format&fit=crop",
      content: `
        <p>Chain-of-thought was just the beginning. To build truly reliable creative agents, we need recursive evaluation.</p>
        <h2>The Critic Loop</h2>
        <p>Every creative generation in our pipeline passes through a "Critic" agent. This agent checks for brand alignment, factual density, and creative variance.</p>
      `,
      readingTime: "5 min read"
    },
    {
      id: 4,
      slug: "amble-lite-paper",
      title: "Amble Lite Paper - November '25",
      date: "Nov 2025",
      tag: "Research",
      excerpt: "Technical deep dive into the architecture behind Amble. Latency optimization, voice activity detection, and the challenge of real-time correction.",
      author: {
          name: "Dr. James Wilson",
          role: "Chief Scientist",
          avatar: "JW"
      },
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2600&auto=format&fit=crop",
      content: `
      <p>Technical deep dive into the architecture behind Amble. Latency optimization, voice activity detection, and the challenge of real-time correction.</p>
    `,
      readingTime: "8 min read"
    },
    {
      id: 5,
      slug: "designing-for-trust",
      title: "Designing for Trust in AI Interfaces",
      date: "Sep 2025",
      tag: "Design",
      excerpt: "How valid pattern design can mitigate hallucination risks and build user confidence.",
      author: {
          name: "Sarah Chen",
          role: "Head of Design",
          avatar: "SC"
      },
      coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2600&auto=format&fit=crop",
      content: `
        <p>Trust is the currency of AI interaction. When users don't trust the system, they don't use it effectively.</p>
        <h2>Visualizing Uncertainty</h2>
        <p>One of our key design decisions was to visually represent the model's confidence levels. Instead of hiding uncertainty, we embrace it as a signal for the user.</p>
      `,
      readingTime: "5 min read"
    },
    {
      id: 6,
      slug: "beyond-chatbots",
      title: "Beyond Chatbots: The Future of Interaction",
      date: "Aug 2025",
      tag: "Vision",
      excerpt: "Why the text box is a limiting form factor for complex problem solving.",
      author: {
          name: "David Park",
          role: "Product Strategy",
          avatar: "DP"
      },
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2600&auto=format&fit=crop",
      content: `
        <p>Chat interfaces are great for casual conversation, but poor for structural work. We're exploring canvas-based interfaces that allow for non-linear collaboration with AI.</p>
      `,
      readingTime: "6 min read"
    },
    {
      id: 7,
      slug: "generative-soundscapes",
      title: "Generative Soundscapes for Focus",
      date: "Jul 2025",
      tag: "Experiment",
      excerpt: "Using real-time data to generate ambient audio that adapts to your workflow intensity.",
      author: {
          name: "Alex Rivera",
          role: "Creative Technologist",
          avatar: "AR"
      },
      coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2600&auto=format&fit=crop",
      content: `
        <p>Sound is an often overlooked dimension of digital product design. We built a prototype that generates ambient noise based on code commit frequency.</p>
      `,
      readingTime: "4 min read"
    },
    {
      id: 8,
      slug: "spatial-computing-patterns",
      title: "Spatial Computing Patterns",
      date: "Jun 2025",
      tag: "Research",
      excerpt: "Translating 2D UI paradigms into 3D space: what works and what breaks.",
      author: {
          name: "Emily Zhang",
          role: "3D Designer",
          avatar: "EZ"
      },
      coverImage: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=2600&auto=format&fit=crop",
      content: `
        <p>Spatial computing requires a rethinking of information density. In 3D, 'white space' becomes 'volume'.</p>
      `,
      readingTime: "7 min read"
    },
    {
      id: 9,
      slug: "sustainable-compute",
      title: "Sustainable Compute for ML Models",
      date: "May 2025",
      tag: "Engineering",
      excerpt: "Optimizing inference pipelines to reduce carbon footprint without sacrificing performance.",
      author: {
          name: "Michael Chang",
          role: "Systems Engineer",
          avatar: "MC"
      },
      coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2600&auto=format&fit=crop",
      content: `
        <p>As models grow larger, their environmental impact grows too. We're implementing quantization and sparse activation to minimize energy usage.</p>
      `,
      readingTime: "5 min read"
    },
    {
      id: 10,
      slug: "interface-fluidity",
      title: "The Physics of Interface Fluidity",
      date: "Apr 2025",
      tag: "Design",
      excerpt: "Applying springs and friction to UI elements to create organic, lifelike motion.",
      author: {
          name: "Lisa Wong",
          role: "Motion Designer",
          avatar: "LW"
      },
      coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2600&auto=format&fit=crop",
      content: `
        <p>Motion shouldn't just be decoration; it should explain state changes. We use spring physics to make interactions feel physical and responsive.</p>
      `,
      readingTime: "5 min read"
    },
    {
      id: 11,
      slug: "collaborative-agents",
      title: "Multi-Agent Collaboration Frameworks",
      date: "Mar 2025",
      tag: "Systems",
      excerpt: "Orchestrating specialized AI agents to solve complex, multi-step problems together.",
      author: {
          name: "Robert Fox",
          role: "AI Researcher",
          avatar: "RF"
      },
      coverImage: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2600&auto=format&fit=crop",
      content: `
        <p>One model can't do it all. We're building frameworks where a 'Coding Agent' works alongside a 'Critique Agent' to improve code quality.</p>
      `,
      readingTime: "9 min read"
    },
    {
      id: 12,
      slug: "memory-systems",
      title: "Long-term Memory Systems for AI",
      date: "Feb 2025",
      tag: "Research",
      excerpt: "Vector databases vs. Knowledge Graphs: finding the right retrieval architecture.",
      author: {
          name: "Jessica Lee",
          role: "Data Scientist",
          avatar: "JL"
      },
      coverImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2600&auto=format&fit=crop",
      content: `
        <p>Context windows are limited. We're experimenting with hybrid retrieval systems that combine semantic search with structured knowledge graphs.</p>
      `,
      readingTime: "6 min read"
    }
  ].map((article, i) => ({ ...article, id: i + 1 })),
];
