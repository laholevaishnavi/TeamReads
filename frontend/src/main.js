import { createApp } from 'vue'
import { createPinia } from 'pinia'

import vuetify from './plugins/vuetify'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore' 

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
const authStore = useAuthStore()
// Await the check before initializing the rest of the app
await authStore.checkAuthStatus()


app.use(createPinia())
app.use(router)

app.use(vuetify)

app.mount('#app')