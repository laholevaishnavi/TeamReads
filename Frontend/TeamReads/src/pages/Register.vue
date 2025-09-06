<template>
  <div class="d-flex justify-center mt-12">
    <v-card width="420" class="pa-6">
      <h2 class="text-h5 mb-4">Create account</h2>
      <v-form @submit.prevent="onSubmit">
        <v-text-field v-model="firstName" label="FirstName" required />
        <v-text-field v-model="lastName" label="LastName" required />
        <v-text-field v-model="email" label="Email" type="email" required />
        <v-text-field v-model="password" label="Password" type="password" required />
        <v-btn :loading="loading" type="submit" color="primary" block class="mt-2">Register</v-btn>
      </v-form>
      <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
    </v-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const firstName = ref('Dora')
const lastName = ref('Pearl')
const email = ref('dora@gmail.com')
const password = ref('Dora@123')
const loading = ref(false)
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

const onSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    await auth.register(firstName.value,lastName.value, email.value, password.value)
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    error.value = e?.response?.data?.error || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>