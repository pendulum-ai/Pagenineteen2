import { buildClient } from '@datocms/cma-client-node';
import fs from 'fs';

const client = buildClient({ apiToken: 'd0beb732911976fa5efdcaaca1b3eb' });
const VOICE_ID = '1hlpeD1ydbI2ow0Tt3EW';
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

const items = await client.items.list({ filter: { type: 'article' } });
console.log(`Found ${items.length} articles\n`);

for (const article of items) {
  const slug = article.slug;
  const outPath = `${outDir}${slug}.mp3`;

  // Skip if already generated
  if (fs.existsSync(outPath)) {
    console.log(`SKIP ${slug} (already exists)`);
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

  console.log(`Generating ${slug} (${text.split(/\s+/).length} words, ${text.length} chars)...`);

  const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text.slice(0, 5000),
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });

  if (resp.ok) {
    const buf = await resp.arrayBuffer();
    fs.writeFileSync(outPath, Buffer.from(buf));
    console.log(`  OK — ${(buf.byteLength / 1024).toFixed(0)} KB\n`);
  } else {
    console.log(`  ERROR ${resp.status}: ${await resp.text()}\n`);
  }

  // Small delay to avoid rate limiting
  await new Promise(r => setTimeout(r, 1000));
}

// Print the STATIC_AUDIO map for AudioNarration.jsx
console.log('\n--- STATIC_AUDIO map ---');
const files = fs.readdirSync(outDir).filter(f => f.endsWith('.mp3')).sort();
console.log('const STATIC_AUDIO = {');
for (const f of files) {
  const slug = f.replace('.mp3', '');
  console.log(`  '${slug}': '/audio/${f}',`);
}
console.log('};');
