import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Honor the PORT assigned by the environment (e.g. the preview runner).
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
})
