import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LandingView from '../views/LandingView.vue' // <--- Importe a Landing

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rota Raiz (Genérica)
    {
      path: '/',
      name: 'home',
      component: LandingView
    },
    // Rota Advogado (Mesmo componente, mas avisa que é niche='advogado')
    {
      path: '/advogado',
      name: 'landing-advogado',
      component: LandingView,
      meta: { niche: 'advogado' } 
    },
    // Rota Terraplanagem
    {
      path: '/terraplanagem',
      name: 'landing-terraplanagem',
      component: LandingView,
      meta: { niche: 'terraplanagem' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('../views/ClientsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/finance',
      name: 'finance',
      component: () => import('../views/ChargesView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation Guard (Mantém a proteção nas rotas privadas)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  // Se a rota exige auth e não tem token, manda pro login
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router