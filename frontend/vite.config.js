import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Isso diz ao Vite: Toda vez que ver '@', entenda como a pasta 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Opcional: Se quiser que as variáveis estejam disponíveis globalmente 
        // em TODOS os componentes sem precisar importar manualmente em cada um,
        // descomente a linha abaixo:
        // additionalData: `@use "@/assets/styles/variables" as *;`
      }
    }
  }
})