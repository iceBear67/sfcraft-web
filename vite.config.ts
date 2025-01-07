import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT)
  },
  plugins: [react()],
})
