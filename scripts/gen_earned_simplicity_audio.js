import { buildClient } from '@datocms/cma-client-node';
import fs from 'fs';

const client = buildClient({ apiToken: 'd0beb732911976fa5efdcaaca1b3eb' });

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
const article = items.find(a => a.slug === 'earned-simplicity');

if (!article) {
  console.error('Article not found');
  process.exit(1);
}

const text = extractText(article.content.document).trim();
console.log('Article:', article.title);
console.log('Text length:', text.length, 'chars');
console.log('Word count:', text.split(/\s+/).length, 'words');
console.log('---');
console.log('Sending to ElevenLabs...');

const VOICE_ID = '1hlpeD1ydbI2ow0Tt3EW';
const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`, {
  method: 'POST',
  headers: {
    'xi-api-key': 'sk_ca6e3cd816baf2831e942cd9a7ef407fb45a42e24e4172e1',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: text.slice(0, 5000),
    model_id: 'eleven_multilingual_v2',
    voice_settings: { stability: 0.5, similarity_boost: 0.75 },
  }),
});

console.log('Status:', resp.status);
if (resp.ok) {
  const buf = await resp.arrayBuffer();
  console.log('Audio size:', buf.byteLength, 'bytes');
  const outPath = new URL('../public/audio/earned-simplicity.mp3', import.meta.url).pathname;
  // Ensure directory exists
  const dir = new URL('../public/audio/', import.meta.url).pathname;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outPath, Buffer.from(buf));
  console.log('Saved to:', outPath);
} else {
  console.log('Error:', await resp.text());
}
