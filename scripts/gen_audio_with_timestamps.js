import { buildClient } from '@datocms/cma-client-node';
import fs from 'fs';

const client = buildClient({ apiToken: 'd0beb732911976fa5efdcaaca1b3eb' });
const VOICE_ID = 'ZF6FPAbjXT4488VcRRnw';
const API_KEY = 'sk_ca6e3cd816baf2831e942cd9a7ef407fb45a42e24e4172e1';
const outDir = new URL('../public/audio/', import.meta.url).pathname;
fs.mkdirSync(outDir, { recursive: true });

function extractText(node) {
  if (!node) return '';
  if (node.type === 'span') return node.value || '';
  if (node.type === 'heading') return (node.children || []).map(extractText).join('') + '.\n\n';
  if (node.type === 'paragraph') return (node.children || []).map(extractText).join('') + '\n\n';
  if (node.type === 'listItem' || node.type === 'list') return (node.children || []).map(extractText).join('');
  if (node.children) return node.children.map(extractText).join('');
  return '';
}

/**
 * Convert character-level alignment from ElevenLabs into word-level timestamps.
 * Groups characters between whitespace; word.start = first char start, word.end = last char end.
 */
function charAlignmentToWords(alignment) {
  const { characters, character_start_times_seconds, character_end_times_seconds } = alignment;

  const words = [];
  let wordChars = '';
  let wordStart = null;
  let wordEnd = null;

  for (let i = 0; i < characters.length; i++) {
    const ch = characters[i];
    const start = character_start_times_seconds[i];
    const end = character_end_times_seconds[i];

    if (/\s/.test(ch)) {
      // Whitespace — flush current word if any
      if (wordChars.length > 0) {
        words.push({ word: wordChars, start: wordStart, end: wordEnd });
        wordChars = '';
        wordStart = null;
        wordEnd = null;
      }
    } else {
      if (wordStart === null) wordStart = start;
      wordEnd = end;
      wordChars += ch;
    }
  }

  // Flush last word
  if (wordChars.length > 0) {
    words.push({ word: wordChars, start: wordStart, end: wordEnd });
  }

  return words;
}

const MAX_CHARS = 4500; // stay under ElevenLabs 5000-char limit with margin

/**
 * Split text into chunks at paragraph boundaries, each under MAX_CHARS.
 */
function splitIntoChunks(text) {
  if (text.length <= MAX_CHARS) return [text];

  const paragraphs = text.split(/\n\n+/);
  const chunks = [];
  let current = '';

  for (const para of paragraphs) {
    const candidate = current ? current + '\n\n' + para : para;
    if (candidate.length > MAX_CHARS && current) {
      chunks.push(current.trim());
      current = para;
    } else {
      current = candidate;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

async function generateChunk(text) {
  const resp = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`API ${resp.status}: ${errText}`);
  }

  return resp.json();
}

// Determine which slugs to process (default: all articles, or pass as CLI args)
const requestedSlugs = process.argv.slice(2);

const items = await client.items.list({ filter: { type: 'article' } });
console.log(`Found ${items.length} articles\n`);

const targetSlugs = requestedSlugs.length > 0
  ? requestedSlugs
  : items.map(a => a.slug);

for (const slug of targetSlugs) {
  const article = items.find(a => a.slug === slug);
  if (!article) {
    console.log(`SKIP ${slug} (not found)`);
    continue;
  }

  if (!article.content || !article.content.document) {
    console.log(`SKIP ${slug} (no content)`);
    continue;
  }

  const text = extractText(article.content.document).trim();
  if (!text) {
    console.log(`SKIP ${slug} (empty text)`);
    continue;
  }

  const chunks = splitIntoChunks(text);
  console.log(`Generating ${slug} (${text.split(/\s+/).length} words, ${text.length} chars, ${chunks.length} chunk${chunks.length > 1 ? 's' : ''})...`);

  const audioBuffers = [];
  const allWords = [];
  let timeOffset = 0;
  let failed = false;

  for (let i = 0; i < chunks.length; i++) {
    if (i > 0) await new Promise(r => setTimeout(r, 1500));

    try {
      const data = await generateChunk(chunks[i]);

      audioBuffers.push(Buffer.from(data.audio_base64, 'base64'));

      // Convert alignment and offset timestamps
      const words = charAlignmentToWords(data.alignment);
      for (const w of words) {
        allWords.push({ word: w.word, start: w.start + timeOffset, end: w.end + timeOffset });
      }

      // Next chunk's offset = last character end time + small gap
      const lastEnd = data.alignment.character_end_times_seconds.at(-1) || 0;
      timeOffset += lastEnd;

      if (chunks.length > 1) {
        console.log(`  Chunk ${i + 1}/${chunks.length}: ${words.length} words, offset ${timeOffset.toFixed(1)}s`);
      }
    } catch (err) {
      console.log(`  ERROR on chunk ${i + 1}: ${err.message}\n`);
      failed = true;
      break;
    }
  }

  if (failed) continue;

  // Concatenate audio buffers and save
  const audioBuffer = Buffer.concat(audioBuffers);
  const mp3Path = `${outDir}${slug}.mp3`;
  fs.writeFileSync(mp3Path, audioBuffer);
  console.log(`  MP3: ${(audioBuffer.byteLength / 1024).toFixed(0)} KB → ${mp3Path}`);

  const jsonPath = `${outDir}${slug}.json`;
  fs.writeFileSync(jsonPath, JSON.stringify(allWords, null, 2));
  console.log(`  JSON: ${allWords.length} words → ${jsonPath}`);
  console.log(`  First 5 words:`, allWords.slice(0, 5));
  console.log();

  // Delay between articles to avoid rate limiting
  await new Promise(r => setTimeout(r, 1500));
}

console.log('Done!');
