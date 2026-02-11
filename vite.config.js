import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
