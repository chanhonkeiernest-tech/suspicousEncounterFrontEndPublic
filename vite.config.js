import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    server: {
      cors: {
        // the origin you will be accessing via browser
        origin: env.VITE_API_URL,
      },
    },
    plugins: [react()],
  }
})
