import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/pages/Landing.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Team from '@/pages/Team.vue'
import Join from '@/pages/Join.vue'
import { useAuthStore } from '@/store/auth'


const routes = [
{ path: '/', component: Landing },
{ path: '/login', component: Login },
{ path: '/register', component: Register },
{ path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
{ path: '/team/:id', component: Team, meta: { requiresAuth: true } },
{ path: '/join', component: Join } // supports invite link with ?code=XYZ
]


const router = createRouter({ history: createWebHistory(), routes })


router.beforeEach((to) => {
const auth = useAuthStore()
if (to.meta.requiresAuth && !auth.isLoggedIn) return '/login'
})


export default router