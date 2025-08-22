// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/', // 배포 MIME 오류 예방: 번들 경로 절대경로
  server: {
    proxy: {
      '/api': {
        target: 'https://yumiykim.shop', // ← 여기서 /api 빼기!
        changeOrigin: true,
        secure: false,
        // rewrite 불필요: /api 접두사는 그대로 유지됨
      }
    }
  }
})
