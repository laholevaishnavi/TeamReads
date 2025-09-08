import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import LandingPage from '../views/LandingPage.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupPage.vue')
    },
    // Protected Routes using the DefaultLayout
    {
      path: '/dashboard',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '', // Default child route for /dashboard
          name: 'dashboard',
          component: () => import('../views/DashboardPage.vue')
        }
        ,{
          path: '/team/:teamId', // Dynamic teamId ghenyasathi
          name: 'team-detail',
          component: () => import('../views/TeamDetailPage.vue')
        },
      ]
    }
  ]
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  // For now, let's assume if there's a user object, they are authenticated.
  // In a real app, you'd check for a token and verify it.
  const isAuthenticated = authStore.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // If route requires auth and user is not logged in, redirect to login
    next({ name: 'login' })
  } else {
    // Otherwise, allow navigation
    next()
  }
})

export default router