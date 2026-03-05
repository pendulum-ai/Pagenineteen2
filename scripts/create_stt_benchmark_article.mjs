import { buildClient, buildBlockRecord } from '@datocms/cma-client-node';
const client = buildClient({ apiToken: 'd0beb732911976fa5efdcaaca1b3eb' });

const IMAGE_BLOCK_TYPE_ID = 'CClPQltUTvSL1gf4nTBynA';
const HTML_BLOCK_TYPE_ID = 'CScar7bkTTS4dRkVWcscDQ';

// Upload IDs for the 4 chart images
const UPLOAD_SCATTER = 'BL4t55yHTPe-r6pcIRkPBA';
const UPLOAD_PARETO = 'WzGQotgqTWSIrcKfBZjm-A';
const UPLOAD_BOXPLOT = 'cgPdxCMYRtS4_2lXCQdyfg';
const UPLOAD_LATENCY = 'Stn3KMb3Swixw6zmz7RRgA';

// --- helpers ---
function p(text) {
  return { type: 'paragraph', children: [{ type: 'span', value: text }] };
}
function h(text, level = 1) {
  return { type: 'heading', level, children: [{ type: 'span', value: text }] };
}
function pb(parts) {
  const children = parts.map(part => {
    if (typeof part === 'string') return { type: 'span', value: part };
    if (part.bold) return { type: 'span', marks: ['strong'], value: part.text };
    return { type: 'span', value: part.text };
  });
  return { type: 'paragraph', children };
}
function pLink(before, linkText, linkUrl, after) {
  return {
    type: 'paragraph',
    children: [
      { type: 'span', value: before },
      { type: 'link', url: linkUrl, children: [{ type: 'span', value: linkText }] },
      { type: 'span', value: after },
    ],
  };
}
function li(text) {
  return { type: 'listItem', children: [{ type: 'paragraph', children: [{ type: 'span', value: text }] }] };
}
function ul(items) {
  return { type: 'list', style: 'bulleted', children: items.map(li) };
}
function imageBlock(uploadId, caption) {
  return {
    type: 'block',
    item: buildBlockRecord({
      item_type: { type: 'item_type', id: IMAGE_BLOCK_TYPE_ID },
      image: { upload_id: uploadId },
      caption,
    }),
  };
}
function htmlBlock(html) {
  return {
    type: 'block',
    item: buildBlockRecord({
      item_type: { type: 'item_type', id: HTML_BLOCK_TYPE_ID },
      html_content: html,
    }),
  };
}

// --- Table HTML ---

const TABLE_TRANSCRIPTION = `<table>
<thead>
<tr><th class="num">Rank</th><th>Provider / Model</th><th>Method</th><th class="num">n</th><th class="num">Avg WER</th><th>95% CI</th><th class="num">Avg Latency</th><th class="num">p95 Latency</th><th class="num">Cost / 1K</th><th class="num">Value Score</th></tr>
</thead>
<tbody>
<tr><td class="num">1</td><td>Mistral Voxtral Mini (STT)</td><td>batch</td><td class="num">40</td><td class="num">0.185</td><td>[0.06, 0.31]</td><td class="num">426 ms</td><td class="num">620 ms</td><td class="num">$0.08</td><td class="num">10.6</td></tr>
<tr><td class="num">2</td><td>Mistral Voxtral Mini v2 (STT)</td><td>batch</td><td class="num">40</td><td class="num">0.185</td><td>[0.06, 0.31]</td><td class="num">354 ms</td><td class="num">612 ms</td><td class="num">$0.12</td><td class="num">7.0</td></tr>
<tr><td class="num">3</td><td>ElevenLabs Scribe v2</td><td>batch</td><td class="num">40</td><td class="num">0.242</td><td>[0.10, 0.38]</td><td class="num">733 ms</td><td class="num">979 ms</td><td class="num">$0.27</td><td class="num">2.8</td></tr>
<tr><td class="num">4</td><td>OpenAI gpt-4o-mini-transcribe</td><td>batch</td><td class="num">45</td><td class="num">0.315</td><td>[0.18, 0.45]</td><td class="num">678 ms</td><td class="num">1,195 ms</td><td class="num">$0.07</td><td class="num">10.1</td></tr>
<tr><td class="num">5</td><td>OpenAI gpt-4o-transcribe</td><td>batch</td><td class="num">50</td><td class="num">0.330</td><td>[0.19, 0.47]</td><td class="num">670 ms</td><td class="num">855 ms</td><td class="num">$0.13</td><td class="num">5.3</td></tr>
<tr><td class="num">6</td><td>Gemini 2.5 Flash</td><td>multimodal</td><td class="num">46</td><td class="num">0.367</td><td>[0.25, 0.49]</td><td class="num">4,172 ms</td><td class="num">5,829 ms</td><td class="num">$0.02</td><td class="num">32.8</td></tr>
<tr><td class="num">7</td><td>Gemini 2.5 Pro</td><td>multimodal</td><td class="num">40</td><td class="num">0.397</td><td>[0.26, 0.53]</td><td class="num">7,274 ms</td><td class="num">13,538 ms</td><td class="num">$0.18</td><td class="num">3.3</td></tr>
<tr><td class="num">8</td><td>OpenAI whisper-1</td><td>batch</td><td class="num">46</td><td class="num">0.449</td><td>[0.27, 0.63]</td><td class="num">1,187 ms</td><td class="num">1,904 ms</td><td class="num">$0.24</td><td class="num">2.3</td></tr>
<tr><td class="num">9</td><td>Mistral Voxtral Mini (chat)</td><td>multimodal</td><td class="num">50</td><td class="num">0.697</td><td>[0.36, 1.04]</td><td class="num">410 ms</td><td class="num">687 ms</td><td class="num">$0.04</td><td class="num">7.7</td></tr>
<tr><td class="num">10</td><td>OpenAI gpt-4o-transcribe (diarize)</td><td>batch</td><td class="num">49</td><td class="num">0.700</td><td>[0.41, 1.00]</td><td class="num">2,098 ms</td><td class="num">2,725 ms</td><td class="num">$1.16</td><td class="num">0.3</td></tr>
<tr><td class="num">11</td><td>Gemini 2.5 Flash Lite</td><td>multimodal</td><td class="num">50</td><td class="num">0.774</td><td>[0.51, 1.04]</td><td class="num">5,017 ms</td><td class="num">7,463 ms</td><td class="num">$0.01</td><td class="num">23.2</td></tr>
<tr><td class="num">12</td><td>Mistral Voxtral Small (chat)</td><td>multimodal</td><td class="num">50</td><td class="num">1.616</td><td>[0.42, 2.81]</td><td class="num">437 ms</td><td class="num">716 ms</td><td class="num">$0.16</td><td class="num">-3.9</td></tr>
</tbody>
</table>
<p style="font-size:0.85em;opacity:0.6;margin-top:0.5em;">Value Score = (1 − avg_wer) / (avg_cost × 1000). Higher is better.</p>`;

const TABLE_AUDIO_TO_TEXT = `<table>
<thead>
<tr><th>Provider / Model</th><th>Method</th><th class="num">n</th><th class="num">Avg Words</th><th class="num">Avg Latency</th><th class="num">p95 Latency</th><th class="num">TTFT</th><th class="num">p95 TTFT</th><th class="num">Cost / 1K</th></tr>
</thead>
<tbody>
<tr><td>OpenAI gpt-realtime</td><td>streaming</td><td class="num">50</td><td class="num">49.7</td><td class="num">3,766 ms</td><td class="num">4,453 ms</td><td class="num">556 ms</td><td class="num">809 ms</td><td class="num">$0.80</td></tr>
<tr><td>OpenAI gpt-audio</td><td>streaming</td><td class="num">50</td><td class="num">28.0</td><td class="num">1,090 ms</td><td class="num">1,650 ms</td><td class="num">798 ms</td><td class="num">1,217 ms</td><td class="num">$0.55</td></tr>
<tr><td>OpenAI gpt-realtime-mini</td><td>streaming</td><td class="num">50</td><td class="num">31.9</td><td class="num">3,636 ms</td><td class="num">4,078 ms</td><td class="num">592 ms</td><td class="num">870 ms</td><td class="num">$0.08</td></tr>
<tr><td>OpenAI gpt-4o-audio-preview</td><td>streaming</td><td class="num">48</td><td class="num">18.6</td><td class="num">1,022 ms</td><td class="num">1,376 ms</td><td class="num">822 ms</td><td class="num">1,155 ms</td><td class="num">$0.46</td></tr>
<tr><td>OpenAI gpt-audio-mini</td><td>streaming</td><td class="num">50</td><td class="num">20.8</td><td class="num">1,182 ms</td><td class="num">1,629 ms</td><td class="num">1,022 ms</td><td class="num">1,343 ms</td><td class="num">$0.11</td></tr>
<tr><td>OpenAI gpt-4o-realtime-preview</td><td>streaming</td><td class="num">46</td><td class="num">57.3</td><td class="num">3,860 ms</td><td class="num">4,511 ms</td><td class="num">575 ms</td><td class="num">809 ms</td><td class="num">$1.11</td></tr>
<tr><td>Mistral Voxtral Small</td><td>multimodal</td><td class="num">50</td><td class="num">11.9</td><td class="num">503 ms</td><td class="num">736 ms</td><td class="num">--</td><td class="num">--</td><td class="num">$0.16</td></tr>
<tr><td>OpenAI gpt-4o-mini-realtime</td><td>streaming</td><td class="num">50</td><td class="num">30.8</td><td class="num">3,774 ms</td><td class="num">4,273 ms</td><td class="num">696 ms</td><td class="num">1,199 ms</td><td class="num">$0.08</td></tr>
<tr><td>Gemini 2.5 Pro</td><td>multimodal</td><td class="num">40</td><td class="num">27.1</td><td class="num">14,380 ms</td><td class="num">18,531 ms</td><td class="num">--</td><td class="num">--</td><td class="num">$0.51</td></tr>
<tr><td>Gemini 2.5 Flash</td><td>multimodal</td><td class="num">50</td><td class="num">19.6</td><td class="num">5,063 ms</td><td class="num">8,415 ms</td><td class="num">--</td><td class="num">--</td><td class="num">$0.03</td></tr>
<tr><td>Mistral Voxtral Mini</td><td>multimodal</td><td class="num">50</td><td class="num">3.9</td><td class="num">375 ms</td><td class="num">612 ms</td><td class="num">--</td><td class="num">--</td><td class="num">$0.04</td></tr>
<tr><td>Gemini 2.5 Flash Lite</td><td>multimodal</td><td class="num">50</td><td class="num">12.2</td><td class="num">4,501 ms</td><td class="num">8,965 ms</td><td class="num">--</td><td class="num">--</td><td class="num">$0.01</td></tr>
</tbody>
</table>`;

const TABLE_AUDIO_TO_AUDIO = `<table>
<thead>
<tr><th>Provider / Model</th><th class="num">Avg Latency</th><th class="num">p95 Latency</th><th class="num">TTFA</th><th class="num">Cost / 1K</th><th class="num">Avg Clip Duration</th></tr>
</thead>
<tbody>
<tr><td>OpenAI gpt-audio-mini</td><td class="num">2,595 ms</td><td class="num">4,482 ms</td><td class="num">--</td><td class="num">$0.50</td><td class="num">--</td></tr>
<tr><td>OpenAI gpt-audio</td><td class="num">3,194 ms</td><td class="num">7,268 ms</td><td class="num">--</td><td class="num">$2.33</td><td class="num">--</td></tr>
<tr><td>OpenAI gpt-realtime-mini</td><td class="num">4,381 ms</td><td class="num">5,785 ms</td><td class="num">850 ms</td><td class="num">$0.42</td><td class="num">6.2s</td></tr>
<tr><td>OpenAI gpt-4o-mini-realtime</td><td class="num">4,329 ms</td><td class="num">5,393 ms</td><td class="num">791 ms</td><td class="num">$0.38</td><td class="num">5.6s</td></tr>
<tr><td>OpenAI gpt-realtime</td><td class="num">5,163 ms</td><td class="num">8,637 ms</td><td class="num">680 ms</td><td class="num">$3.61</td><td class="num">8.4s</td></tr>
<tr><td>OpenAI gpt-4o-realtime-preview</td><td class="num">5,131 ms</td><td class="num">8,885 ms</td><td class="num">709 ms</td><td class="num">$3.99</td><td class="num">7.4s</td></tr>
</tbody>
</table>`;

const TABLE_DECISIONS = `<table>
<thead>
<tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr>
</thead>
<tbody>
<tr><td><strong>Architecture</strong></td><td>Cascade (STT → LLM → TTS)</td><td>Audio LLM voices are too robotic for character-driven tutors. The cascade gives us control over each stage independently.</td></tr>
<tr><td><strong>STT (production)</strong></td><td>OpenAI gpt-4o-transcribe</td><td>Sub-700ms latency, strong accuracy, predictable cost. Battle-tested in production.</td></tr>
<tr><td><strong>STT (testing)</strong></td><td>Mistral Voxtral Mini (STT endpoint)</td><td>Best raw accuracy (0.185 WER), fastest (426ms), cheapest ($0.08/1K). Running in shadow mode to evaluate production readiness.</td></tr>
<tr><td><strong>Audio-to-text</strong></td><td>Monitor, don't ship yet</td><td>TTFT advantage is real (556–696ms). Quality evaluation for tutoring use cases is the bottleneck.</td></tr>
<tr><td><strong>Audio-to-audio</strong></td><td>Not viable today</td><td>Voice library limitations are a dealbreaker for multi-persona products. Revisit quarterly.</td></tr>
</tbody>
</table>`;

// --- Article content ---

const dastChildren = [
  // Opening paragraphs (no heading)
  p("We ship multiple tutors across seven languages. Each one runs on a voice pipeline: the user speaks, the system transcribes, a language model reasons over the transcript, and a TTS engine speaks the reply. Every component in that chain is a vendor API call with its own accuracy, latency, and cost profile."),

  p("Late last year we started asking ourselves whether the chain itself was the right architecture. End-to-end audio LLMs from OpenAI and Google promised to collapse the pipeline into a single model that listens and speaks natively. If that worked, we could cut two network hops and simplify the system. If it didn't, we needed to know exactly where it fell short so we could make a principled decision to keep the cascade."),

  pLink('This post covers what we found when we benchmarked 30 model-and-method combinations across four providers on 50 real user recordings. A companion post, ', '"Giving Each Tutor a Voice"', '#', ', covers our TTS selection.'),

  // --- The problem ---
  h('The problem'),
  p("Speech from people learning a new language is adversarial input for speech models. Users mispronounce words, hesitate, code-switch between languages mid-sentence, and record on mobile devices in noisy environments. The latency budget is brutal: anything over two seconds of silence after the user stops talking feels broken. And cost compounds fast when a single conversation has dozens of turns, each hitting the API."),

  p("These constraints pull in opposite directions. The most accurate transcription model might be too slow. The cheapest option might hallucinate on accented speech. We needed a systematic way to measure the trade-offs rather than picking models based on blog posts and pricing pages."),

  // --- What we built ---
  h('What we built'),
  p("We wrote a multi-provider evaluation harness that runs structured experiments against real user audio. It covers transcription, text response generation, and audio response generation across batch, streaming, and multimodal methods, with implementations for OpenAI, Gemini, Mistral, and ElevenLabs."),

  p("The test data comes from real conversations. The harness reads from our production audio logs, where each recording carries metadata about the tutor, conversation length, and turn count. Every benchmark runs against real learner speech with real accents, hesitations, and background noise."),

  p("For each file, the system runs every applicable task across all registered providers. A performance layer captures response time, time to first token, time to first audio, and estimated cost. Seed-controlled sampling makes runs reproducible, and each run produces per-file reports, charts, and an aggregate summary. This run covered 50 files across 30 model/method combinations: 1,500 API calls, 98.4% success rate."),

  h('How we score without ground truth', 2),
  p("We don't have human-annotated reference transcripts. Instead, we use consensus-driven scoring: every provider's transcription is normalised (lowercased, stripped of punctuation and diacritics), and the most common variant becomes the reference. Word Error Rate and character similarity are measured against that consensus."),

  p("This is an imperfect proxy. If multiple models make the same mistake, the consensus absorbs it. But with 12 model variants per file, the majority transcript is stable enough to catch the accent-specific failures that matter most. We report 95% confidence intervals and p95 tail latencies alongside averages to account for variance across the heterogeneous audio samples."),

  // --- Transcription ---
  h('Transcription: which model hears learners best?'),
  p("We benchmarked 12 transcription models across four providers. The scatter plot below shows every model positioned by accuracy (WER, lower is better) against cost per 1,000 turns:"),

  imageBlock(UPLOAD_SCATTER, 'Transcription accuracy vs. cost across 12 models. Lower-left is better.'),

  p("The Pareto frontier highlights the non-dominated trade-offs between cost and accuracy:"),

  imageBlock(UPLOAD_PARETO, 'Pareto frontier: the best accuracy available at each price point.'),

  h('Full results', 2),
  htmlBlock(TABLE_TRANSCRIPTION),

  p("The box plot below shows WER distribution per model, revealing not just averages but how consistently each model performs across diverse audio:"),

  imageBlock(UPLOAD_BOXPLOT, 'WER distribution per model. Tighter boxes indicate more consistent quality across diverse audio.'),

  h('What the data tells us', 2),
  pb([{ bold: true, text: "Dedicated STT models decisively outperform multimodal chat endpoints on transcription." }, " Mistral's batch STT models led the field at 0.185 WER with sub-500ms latency, the fastest and most accurate combination in the benchmark. The same underlying Voxtral Mini model scored 0.697 WER when accessed through the chat interface, nearly 4x worse, making the clearest case in our data for purpose-built transcription APIs."]),

  pb([{ bold: true, text: "OpenAI's transcription models landed mid-pack, not at the top." }, " gpt-4o-transcribe (0.330 WER) and gpt-4o-mini-transcribe (0.315 WER) are fast and affordable, but at 50-file scale they were outperformed by both Mistral's STT endpoint and ElevenLabs Scribe v2 (0.242 WER). The older whisper-1 model, once the standard, placed 8th at 0.449 WER."]),

  pb([{ bold: true, text: "Gemini 2.5 Flash produced the highest value score in the entire benchmark (32.8):" }, " 0.367 WER at just $0.02 per 1K turns. The catch is latency: 4.2 seconds average, 5.8 seconds at p95. Impractical for real-time conversation, but potentially interesting for offline or batch processing."]),

  pb([{ bold: true, text: "Diarization hurts on single-speaker clips." }, " OpenAI's diarization-enabled transcription model produced 0.700 WER at $1.16 per 1K turns, the worst cost-to-accuracy ratio in the benchmark. For Amble's single-speaker turns, the diarization overhead adds noise without benefit."]),

  h('Our decision: STT', 2),
  p("We keep gpt-4o-transcribe and its variants in production. It offers sub-700ms latency, strong accuracy on learner speech, and predictable pricing. But we're actively testing Mistral's Voxtral Mini STT as an alternative: it delivered the best raw accuracy in our benchmark at roughly half the cost, and its 426ms average latency is the fastest of any model we tested. Whether it holds up under production-scale load and across our full language set is what we're evaluating next."),

  // --- Audio-to-Text ---
  h('Audio-to-Text: can we skip the LLM?'),
  p("A promising alternative to the STT → LLM cascade is feeding audio directly to a model that generates a text response, skipping the transcription step entirely. We benchmarked this path across OpenAI's Realtime and Audio APIs, Gemini, and Mistral."),

  htmlBlock(TABLE_AUDIO_TO_TEXT),

  pb([{ bold: true, text: "The TTFT numbers are the headline here." }, " OpenAI's Realtime models start producing tokens in 556–696ms, faster than transcribing the audio first and then calling a separate text LLM. gpt-realtime-mini delivers 592ms TTFT at just $0.08 per 1K turns, 10x cheaper than the full gpt-realtime."]),

  pb([{ bold: true, text: "A key limitation of this benchmark:" }, " we don't yet have a reliable way to measure the conversational quality of audio LLM responses compared to the text-based models we use in production. Surface metrics like response length and question frequency are poor proxies for whether the model is actually teaching well, following the tutor's persona, or adapting to the learner's level. Until we build proper evaluation for pedagogical quality in audio-native responses, these latency and cost numbers tell only half the story."]),

  pb([{ bold: true, text: "Our take:" }, " Audio-to-text is a promising path we're monitoring closely. The latency advantage is real, especially for perceived responsiveness. But our production pipeline uses STT followed by a text-based LLM, which gives us full control over response quality through prompt engineering and context injection. As these audio-native models improve at following complex system prompts, the case for collapsing the cascade gets stronger."]),

  // --- Audio-to-Audio ---
  h('Audio-to-Audio: the end-to-end dream'),
  p("The ultimate simplification would be a single model that takes audio in and produces audio out, eliminating both the STT and TTS steps. Only OpenAI currently offers this capability. All models achieved 100% success rate across our 50 files:"),

  htmlBlock(TABLE_AUDIO_TO_AUDIO),

  p("The Realtime API models stream audio with time-to-first-audio under 850ms, which feels responsive. The Chat Completions variants (gpt-audio, gpt-audio-mini) return the full clip at once with lower total latency but no streaming."),

  pb([{ bold: true, text: "Why we didn't ship this." }, " The voice libraries on these models are extremely limited: a handful of preset synthetic voices that sound robotic compared to dedicated TTS providers. For a product where each tutor is a distinct character with personality, regional idioms, and a natural speaking style, these voices break the illusion. We need Valentina from Rome to sound different from Gabriel from Paris, and neither should sound like a text-to-speech demo. Until audio LLMs support custom voice cloning or integrate with external voice libraries, the cascade remains our architecture."]),

  imageBlock(UPLOAD_LATENCY, 'Latency breakdown across models: time to first token vs. total response time.'),

  // --- Regression Testing ---
  h('Regression testing'),
  p("Model providers update their models regularly, and accent robustness can shift between versions. The harness is designed to catch this."),

  p("Seed-controlled sampling means running the same parameters always selects the same audio files from production. If a provider ships a model update and WER on our test set jumps, the aggregate plots and report diffs surface it immediately. Each run's output is written to a unique directory, making every run reproducible and diffable."),

  // --- What We Decided ---
  h('What we decided'),
  htmlBlock(TABLE_DECISIONS),

  // --- What's Next ---
  h("What's next"),
  pb([{ bold: true, text: "Mistral STT in production." }, " The 0.185 WER and 426ms latency are hard to ignore. We're running it alongside gpt-4o-transcribe in shadow mode to evaluate reliability, language coverage, and behaviour under production load."]),

  pb([{ bold: true, text: "Audio-to-text quality evaluation." }, " The missing piece is a proper way to measure whether audio LLM responses match the pedagogical quality of our text-based pipeline. Until we can compare tutoring quality head-to-head, the latency advantage alone isn't enough to justify the switch."]),

  pb([{ bold: true, text: "Human reference transcripts." }, " Consensus scoring is a useful bootstrap, but it has a ceiling. We're building a small manually-transcribed test set, focused on the accents and error patterns that trip up the most models, to anchor WER scoring against ground truth."]),

  pb([{ bold: true, text: "Learner cohort analysis." }, " Grouping results by user proficiency level and native language would reveal whether our model choices hold up across the full learner spectrum, or whether beginners with heavy accents need a different model than advanced speakers."]),
];

// --- Create and publish ---
const types = await client.itemTypes.list();
const articleType = types.find(t => t.api_key === 'article');

const content = {
  schema: 'dast',
  document: { type: 'root', children: dastChildren },
};

const record = await client.items.create({
  item_type: { type: 'item_type', id: articleType.id },
  title: "Benchmarking Amble's Ears",
  slug: 'benchmarking-ambles-ears',
  subcopy: 'STT and Audio LLMs on Real Learner Speech',
  author_name: 'Tarik',
  tag: 'Methods',
  reading_time: '15 min read',
  date: '2026-03-05',
  excerpt: 'STT and Audio LLMs on Real Learner Speech',
  content,
});

console.log('Created article:', record.id, record.slug);
await client.items.publish(record.id);
console.log('Published!');
