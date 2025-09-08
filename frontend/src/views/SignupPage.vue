<template>
  <v-container class="fill-height" fluid style="background-color: #f5f5f5;">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-4" elevation="4">
          <v-card-title class="text-center text-h5 font-weight-bold">
            Create Your Account
          </v-card-title>
          <v-card-subtitle class="text-center mb-4">
            Join us and start collaborating
          </v-card-subtitle>
          <v-card-text>
            <v-form @submit.prevent="handleSignup">
              <v-text-field
                v-model="firstName"
                label="First Name"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                class="mb-3"
                required
              ></v-text-field>

               <v-text-field
                v-model="lastName"
                label="Last Name (Optional)"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                class="mb-3"
              ></v-text-field>

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
                v-if="message"
                :type="messageType"
                variant="tonal"
                class="my-3"
                density="compact"
              >
                {{ message }}
              </v-alert>
              
              <v-btn
                type="submit"
                color="primary"
                block
                size="large"
                class="mt-4"
                :loading="loading"
              >
                Sign Up
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <span class="text-body-2">Already have an account?</span>
            <v-btn variant="text" color="primary" to="/login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);
const message = ref(null);
const messageType = ref('success');

const handleSignup = async () => {
  loading.value = true;
  message.value = null;
  try {
    await authStore.signup({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
    
    // As requested, show success message and redirect to login
    messageType.value = 'success';
    message.value = 'Registration successful! Redirecting to login...';
    setTimeout(() => {
      router.push('/login');
    }, 2000);

  } catch (error) {
    messageType.value = 'error';
    message.value = error.error || 'Signup failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>