import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify la import kara
import vuetify from './plugins/vuetify'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Vuetify la app sobat joda
app.use(vuetify)

app.mount('#app')