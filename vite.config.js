import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
const url = process.env.url;
// https://vite.dev/config/
export default defineConfig({
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
})
