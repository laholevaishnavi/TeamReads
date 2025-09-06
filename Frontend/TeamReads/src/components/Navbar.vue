<template>
<v-app-bar app flat>
<v-toolbar-title class="font-weight-bold">TeamReads</v-toolbar-title>
<v-spacer />


<!-- Dark mode toggle -->
<v-btn icon="mdi-theme-light-dark" @click="toggleTheme" :title="`Switch to ${isDark ? 'light' : 'dark'} mode`" />


<v-divider vertical class="mx-3" />


<template v-if="!auth.isLoggedIn">
<v-btn to="/login" variant="text">Login</v-btn>
<v-btn to="/register" color="primary" variant="flat">Register</v-btn>
</template>
<template v-else>
<v-btn to="/dashboard" variant="text">Dashboard</v-btn>
<v-btn color="error" @click="auth.logout()">Logout</v-btn>
</template>
</v-app-bar>
</template>


<script setup>
import { useAuthStore } from '@/store/auth'
import { useTheme } from 'vuetify'
import { computed } from 'vue'


const auth = useAuthStore()
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
const toggleTheme = () => {
theme.global.name.value = isDark.value ? 'light' : 'dark'
}
</script>