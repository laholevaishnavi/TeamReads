import { defineStore } from 'pinia'
import { apiLogin, apiRegister } from '@/api/auth'


export const useAuthStore = defineStore('auth', {
state: () => ({
token: localStorage.getItem('token') || null,
user: JSON.parse(localStorage.getItem('user') || 'null')
}),
getters: {
isLoggedIn: (s) => !!s.token
},
actions: {
async register(firstName, lastName, email, password) {
await apiRegister({ firstName, lastName, email, password })
},
async login(email, password) {
const { data } = await apiLogin({ email, password })
this.token = data.token
this.user = data.user
localStorage.setItem('token', this.token)
localStorage.setItem('user', JSON.stringify(this.user))
},
logout() {
this.token = null
this.user = null
localStorage.removeItem('token')
localStorage.removeItem('user')
}
}
})