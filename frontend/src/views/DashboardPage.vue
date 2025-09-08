<template>
  <v-row>
    <v-col cols="12" md="6">
      <h1 class="text-h4 font-weight-medium">Welcome, {{ authStore.user?.firstName }}!</h1>
      <p class="text-body-1 text-grey-darken-1 mt-1">Manage your teams or create a new one.</p>
    </v-col>
    <v-col cols="12" md="6" class="d-flex justify-md-end align-center">
      <v-btn @click="isCreateModalVisible = true" color="primary" class="mr-2">
        <v-icon left>mdi-plus-network</v-icon>
        Create Team
      </v-btn>
      <v-btn @click="isJoinModalVisible = true" variant="outlined">
        <v-icon left>mdi-login-variant</v-icon>
        Join Team
      </v-btn>
    </v-col>
  </v-row>
  
  <v-divider class="my-6"></v-divider>

  <div v-if="teamStore.teams.length > 0">
    <h2 class="text-h5 font-weight-medium mb-4">Your Teams</h2>
    <v-row>
      <v-col cols="12" md="4" v-for="team in teamStore.teams" :key="team._id">
        <v-card
          hover
          class="pa-4"
          :to="`/team/${team._id}`"
        >
          <v-card-title class="font-weight-bold">{{ team.name }}</v-card-title>
          <v-card-subtitle>{{ team.members.length }} member(s)</v-card-subtitle>
          <v-card-text class="font-mono">
            Join Code: <strong>{{ team.code }}</strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
  
  <div v-else class="text-center text-grey-darken-1 py-12">
    <v-icon size="64" class="mb-4">mdi-account-group-outline</v-icon>
    <h3 class="text-h6">You haven't joined any teams yet.</h3>
    <p class="mt-2">Create a new team or join one using a code to get started!</p>
  </div>

  <CreateTeamModal v-model:isVisible="isCreateModalVisible" />
  <JoinTeamModal v-model:isVisible="isJoinModalVisible" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useTeamStore } from '../stores/teamStore';
import CreateTeamModal from '../components/CreateTeamModal.vue';
import JoinTeamModal from '../components/JoinTeamModal.vue';

const authStore = useAuthStore();
const teamStore = useTeamStore();

const isCreateModalVisible = ref(false);
const isJoinModalVisible = ref(false);

onMounted(() => {
  teamStore.fetchUserTeams();
});
</script>