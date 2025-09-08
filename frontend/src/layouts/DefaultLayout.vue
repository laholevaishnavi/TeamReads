<template>
  <v-app style="background-color: #f5f5f5;">
    <AppNavbar />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import AppNavbar from '../components/AppNavbar.vue';
</script>