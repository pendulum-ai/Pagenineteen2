export const projects = [
  {
    id: 'amble',
    title: 'amble',
    tagline: 'Real-time, personalized language learning',
    description: "Amble gets to know each user, their proficiency and their interests, and bends curriculums around them. Built on real-time voice interfaces and adaptive learning driven by continuous feedback.",
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
    id: 'pendulum',
    title: 'pendulum',
    tagline: 'Multimodal asset search at enterprise scale',
    description: "An enterprise system for indexing, organizing, and retrieving multimodal assets at scale. Built to handle millions of assets across images and text, with flexibility for downstream generative workflows. Developed with R/GA, WPP, and Kering.",
    link: 'https://search-app-teal.vercel.app/',
    github: 'https://google.com', // TODO: Replace with real GitHub URL
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
    id: 'lightnote',
    title: 'lightnote',
    tagline: 'Composable creative workflows for generative media',
    description: "Lightnote explores what creative software looks like when AI is native to the interface rather than layered on top. A canvas-based environment for composing fine-tuned generative models and AI tools into repeatable creative workflows.",
    link: 'https://google.com', // TODO: Replace with real demo URL
    github: 'https://google.com', // TODO: Replace with real GitHub URL
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
