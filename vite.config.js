import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { url } = loadEnv(mode, process.cwd(), '')

  if (!url) {
    throw new Error('Set url in the project .env file to the backend URL.')
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/checksession': {
          target: url,
          changeOrigin: true,
        },
        '/login/user': {
          target: url,
          changeOrigin: true,
        },
        '/login/newuser': {
          target: url,
          changeOrigin: true,
        },
        '/login/nouser': {
          target: url,
          changeOrigin: true,
        },
        '/encounter': {
          target: url,
          changeOrigin: true,
        },
        '/merge': {
          target: url,
          changeOrigin: true,
        },
        '/myEncounter': {
          target: url,
          changeOrigin: true,
        },
        '/encounterMerge/reject': {
          target: url,
          changeOrigin: true,
        },
      },
    },
  }
})
