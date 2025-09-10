<template>
  <v-app-bar app color="white" elevation="2">
    <v-container class="d-flex align-center">
      <v-icon color="primary" class="mr-2">mdi-lan</v-icon>
      <v-toolbar-title class="font-weight-bold text-primary">
        TeamReads
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="primary">
              <span class="white--text text-h6">{{ userInitials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list density="compact">
          <v-list-item @click="handleLogout" title="Logout" prepend-icon="mdi-logout"></v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const userInitials = computed(() => {
  if (authStore.user && authStore.user.firstName) {
    return authStore.user.firstName.charAt(0).toUpperCase();
  }
  return '?';
});

const handleLogout = () => {
  authStore.logout();
};
</script>