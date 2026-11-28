/* global process */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), 'VITE_'), ...process.env }
  if (['VITE_OPENROUTER_API_KEY', 'VITE_RESEND_API_KEY', 'VITE_WEB3FORMS_KEY'].some(key => env[key])) {
    throw new Error('Remove private provider credentials from VITE_ build variables; configure server-only keys instead.')
  }
  return {
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  }
})
