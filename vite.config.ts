import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  // 개발용 서버 옵션
  server: {
    proxy: {
      // http://localhost:5173/api
      '/api': { target: 'http://localhost:3000' }
    }
  }
})
