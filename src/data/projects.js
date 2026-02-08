export const projects = [
  {
    id: 'pendulum',
    title: 'Pendulum',
    tagline: 'Large-scale multimodal asset search and organisation',
    description: [
      'Pendulum is a system for indexing, organising, and retrieving multimodal assets across images and text.',
      'We are actively developing Pendulum to explore how multimodal retrieval can function both as a standalone product and as infrastructure for generative systems.',
      'The system is designed to ingest, index, and organise millions of assets while remaining flexible for downstream generative use cases.'
    ],
    link: 'https://search-app-teal.vercel.app/',
    github: 'https://google.com',
    focus: [
      'Metadata extraction using LLMs and vision-language models',
      'Plain-text indexing combined with vector embeddings',
      'Scalable distributed ingestion pipeline for media workloads',
      'Natural-language retrieval integrated into multimodal RAG'
    ],
    stack: ['Vector DB', 'CLIP', 'LLM Metadata', 'DAG', 'Kandji'],
    bgColor: '#F0F2F0',
    visualType: 'network',
    screenshotUrl: '/images/Pendulum.webp',
    screenshotFallback: '/images/Pendulum.jpg'
  },
  {
    id: 'amble',
    title: 'Amble',
    tagline: 'Real-time, personalised language learning',
    description: [
      'Amble explores how agentic systems and real-time voice interfaces can deliver genuinely personalised learning experiences.',
      'We are building Amble as a live environment for testing adaptive learning systems driven by continuous feedback.',
      'Amble continues to inform our work on evaluation-driven agentic workflows in consumer-facing systems.'
    ],
    link: 'https://www.amble.app/',
    github: null,
    focus: [
      'Real-time conversational voice agents built on WebRTC',
      'Orchestration across STT, LLMs, and TTS',
      'Voice activity detection and real-time translation',
      'Agentic content-production pipelines with auto-eval loops'
    ],
    stack: ['WebRTC', 'VAD', 'Whisper', 'LLM', 'TTS'],
    bgColor: '#F5F0EB',
    visualType: 'voice',
    screenshotUrl: '/images/Amble.webp',
    screenshotFallback: '/images/Amble.jpg'
  },
  {
    id: 'lightnote',
    title: 'Lightnote',
    tagline: 'Composable creative workflows for generative media',
    description: [
      'Lightnote explores what creative software looks like when AI is native to the interface rather than layered on top.',
      'We are building a canvas-based environment that allows users to compose fine-tuned generative models and AI tools into repeatable creative workflows.',
      'Lightnote is an ongoing testbed for understanding how creative professionals interact with multimodal systems when composition becomes the primary abstraction.'
    ],
    link: 'https://google.com', // Placeholder for tldraw-like demo
    github: 'https://google.com',
    focus: [
      'Automated LoRA fine-tuning pipelines',
      'Support for multiple model families (Flux, SDXL)',
      'Workflow-specific tools: Inpainting, style transfer, background removal',
      'Canvas-style interface for composing models and tools'
    ],
    stack: ['React Flow', 'Diffusers', 'LoRA', 'Flux', 'SDXL'],
    bgColor: '#FAF9F6',
    visualType: 'particles',
    screenshotUrl: '/images/Lightnote_v2.webp',
    screenshotFallback: '/images/Lightnote_v2.jpg'
  }
];
