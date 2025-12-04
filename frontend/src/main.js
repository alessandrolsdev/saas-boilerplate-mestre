import { createApp } from 'vue'
import { createPinia } from 'pinia' // Importando Pinia
import './assets/style.css' // Adicione isso
import App from './App.vue'
import router from './router' // Vamos configurar já já

const app = createApp(App)

app.use(createPinia()) // Ativando Pinia
app.use(router)

app.mount('#app')