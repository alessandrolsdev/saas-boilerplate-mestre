import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LandingView from '../views/LandingView.vue'

// Lazy loading para otimizar o carregamento inicial
const DashboardMaster = () => import('../views/DashboardMaster.vue')

/**
 * Configuração do Vue Router.
 * 
 * Define as rotas da aplicação, incluindo rotas públicas (Landing Pages, Login)
 * e rotas protegidas (Dashboard, Clientes, Financeiro).
 * Utiliza meta fields para controle de acesso e nicho.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView
    },
    {
      path: '/advogado',
      name: 'landing-advogado',
      component: LandingView,
      meta: { niche: 'advogado' }
    },
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
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardMaster,
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

/**
 * Guard de navegação global.
 * 
 * Verifica se a rota requer autenticação (`requiresAuth`).
 * Se o usuário não tiver um token no localStorage, redireciona para o login.
 */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router