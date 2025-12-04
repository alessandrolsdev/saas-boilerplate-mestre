import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LandingView from '../views/LandingView.vue'

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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router