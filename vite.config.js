import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Local dev handler for /api/narrate (mirrors the Vercel serverless function)
function narrateDevPlugin() {
  const VOICE_ID = '1hlpeD1ydbI2ow0Tt3EW';
  let apiKey;

  return {
    name: 'narrate-dev',
    configureServer(server) {
      apiKey = loadEnv('development', process.cwd(), '').ELEVENLABS_API_KEY;
      server.middlewares.use('/api/narrate', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end(JSON.stringify({ error: 'Method not allowed' }));
        }

        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const { text } = JSON.parse(Buffer.concat(chunks).toString());

        if (!text) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'Missing text' }));
        }

        try {
          const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
            {
              method: 'POST',
              headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                text: text.slice(0, 5000),
                model_id: 'eleven_multilingual_v2',
                voice_settings: { stability: 0.5, similarity_boost: 0.75 },
              }),
            }
          );

          if (!response.ok) {
            res.statusCode = 502;
            return res.end(JSON.stringify({ error: 'TTS generation failed' }));
          }

          const arrayBuffer = await response.arrayBuffer();
          res.setHeader('Content-Type', 'audio/mpeg');
          res.end(Buffer.from(arrayBuffer));
        } catch (err) {
          console.error('Narration dev error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Internal server error' }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), narrateDevPlugin()],
  build: {
    target: 'es2022',   // Drop legacy polyfills (saves ~30KB)
    sourcemap: 'hidden' // Source maps for debugging, not exposed to browser
  },
  server: {
    proxy: {
      '/ph-new': {
        target: 'https://eu.i.posthog.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ph-new/, ''),
      },
    },
  },
})
