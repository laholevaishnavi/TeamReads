<template>
  <v-container class="fill-height" fluid style="background-color: #f5f5f5;">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-4" elevation="4">
          <v-card-title class="text-center text-h5 font-weight-bold">
            Welcome Back!
          </v-card-title>
          <v-card-subtitle class="text-center mb-4">
            Sign in to continue
          </v-card-subtitle>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Email"
                variant="outlined"
                prepend-inner-icon="mdi-email-outline"
                class="mb-3"
                required
              ></v-text-field>
              
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                variant="outlined"
                prepend-inner-icon="mdi-lock-outline"
                required
              ></v-text-field>

              <v-alert
                v-if="errorMessage"
                type="error"
                variant="tonal"
                class="my-3"
                density="compact"
              >
                {{ errorMessage }}
              </v-alert>
              
              <v-btn
                type="submit"
                color="primary"
                block
                size="large"
                class="mt-4"
                :loading="loading"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <span class="text-body-2">Don't have an account?</span>
            <v-btn variant="text" color="primary" to="/signup">Sign Up</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref(null);

const authStore = useAuthStore();

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = null;
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    });
    // The store will handle redirection on success
  } catch (error) {
    errorMessage.value = error.error || 'Login failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>