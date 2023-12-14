import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    proxy: {
      "/assets": {
        target: "https://new9.dart.agency/",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/assets/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
///Extras/dartQUIZ/assets/components/dartquiz/img