import { createApp } from 'vue'
import { createPinia } from 'pinia' // Importando Pinia
import './assets/style.css' // Importação dos estilos globais (Tailwind + Custom)
import App from './App.vue'
import router from './router' // Configuração de rotas

/**
 * Ponto de entrada da aplicação Vue.js.
 * 
 * Inicializa a aplicação, configura o Pinia (State Management) e o Vue Router.
 * Monta a aplicação no elemento #app.
 */
const app = createApp(App)

app.use(createPinia()) // Ativando Pinia
app.use(router)

app.mount('#app')