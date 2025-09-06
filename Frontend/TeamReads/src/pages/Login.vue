<template>
<div class="d-flex justify-center mt-12">
<v-card width="420" class="pa-6">
<h2 class="text-h5 mb-4">Login</h2>
<v-form @submit.prevent="onSubmit">
<v-text-field v-model="email" label="Email" type="email" required />
<v-text-field v-model="password" label="Password" type="password" required />
<v-btn :loading="loading" type="submit" color="primary" block class="mt-2">Login</v-btn>
</v-form>
<v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
</v-card>
</div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'


const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()
const auth = useAuthStore()


const onSubmit = async () => {
loading.value = true
error.value = ''
try {
await auth.login(email.value, password.value)
router.push('/dashboard')
} catch (e) {
error.value = e?.response?.data?.error || 'Login failed'
} finally {
loading.value = false
}
}
</script>