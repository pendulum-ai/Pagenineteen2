export const projects = [
  {
    id: 'lightnote',
    title: 'Lightnote',
    tagline: 'Composable creative workflows for generative media',
    description: 'A canvas-based environment that allows users to compose fine-tuned generative models and AI tools into repeatable creative workflows. Developed in partnership with WPP, Ogilvy, and AKQA.',
    link: '#',
    github: '#',
    focus: [
      'Automated LoRA fine-tuning pipelines',
      'Support for multiple model families (Flux, SDXL)',
      'Workflow-specific tools: Inpainting, style transfer',
      'Canvas-style interface for composing models'
    ],
    stack: ['React Flow', 'Diffusers', 'LoRA', 'Flux', 'SDXL'],
    bgColor: '#FAF9F6' // Warm off-white
  },
  {
    id: 'pendulum',
    title: 'Pendulum',
    tagline: 'Large-scale multimodal asset search and organization',
    description: 'A system for indexing, organizing, and retrieving multimodal assets across images and text. It solves the blank page problem by allowing creatives to instantly retrieve relevant assets from massive libraries using natural language.',
    link: '#',
    github: '#',
    focus: [
      'Metadata extraction using LLMs & vision models',
      'Plain-text indexing combined with vectors',
      'Scalable distributed ingestion pipeline',
      'Natural-language retrieval integrated into RAG'
    ],
    stack: ['Vector DB', 'CLIP', 'LLM Metadata', 'DAG', 'Kandji'],
    bgColor: '#F0F2F0' // Cool off-white
  },
  {
    id: 'amble',
    title: 'Amble',
    tagline: 'Real-time, personalised language learning',
    description: 'A voice-first language learning app that adapts to you in real-time. Amble converses with you, adjusts difficulty based on your pronunciation and vocabulary, and generates personalized listening and reading experiences on topics you care about.',
    link: '#',
    github: null,
    focus: [
      'Voice Activity Detection (VAD) & Diarization',
      'Low-latency speech-to-speech pipeline',
      'Adaptive curriculum generation',
      'Real-time pronunciation feedback'
    ],
    stack: ['WebRTC', 'VAD', 'Whisper', 'LLM', 'TTS'],
    bgColor: '#F5F0EB' // Warm beige
  }
];
