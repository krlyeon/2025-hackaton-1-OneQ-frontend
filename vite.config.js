import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/', // OK
  server: {
    proxy: {
      '/api': {
        target: 'https://yumiykim.shop',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
