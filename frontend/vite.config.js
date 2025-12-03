import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // ESSA LINHA É A MÁGICA:
        // Ela injeta as variáveis automaticamente em todo arquivo .vue
        additionalData: `@use "@/assets/styles/_variables.scss" as *;`
      }
    }
  }
})