<template>
  <v-navigation-drawer permanent location="left" width="280" class="d-flex flex-column">
    <v-list>
      <v-list-item
        :prepend-avatar="userAvatar"
        :title="`${authStore.user?.firstName} ${authStore.user?.lastName || ''}`"
        :subtitle="authStore.user?.email"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact">
      <v-list-subheader class="font-weight-bold">TEAM MEMBERS</v-list-subheader>
      <v-list-item
        v-for="member in teamStore.activeTeam?.members"
        :key="member._id"
        :title="`${member.firstName} ${member.lastName || ''}`"
        prepend-icon="mdi-account-circle-outline"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact">
      <v-list-subheader class="font-weight-bold">YOUR TEAMS</v-list-subheader>
      <v-list-item
        v-for="team in teamStore.teams"
        :key="team._id"
        :title="team.name"
        :to="`/team/${team._id}`"
        :active="team._id === teamStore.activeTeam?._id"
        prepend-icon="mdi-account-group-outline"
        link
      ></v-list-item>
    </v-list>

    <v-spacer></v-spacer>

    <div class="pa-2">
      <v-btn
        block
        variant="text"
        color="error"
        @click="isDialogVisible = true"
        prepend-icon="mdi-exit-run"
      >
        Leave Team
      </v-btn>
    </div>

    <v-dialog v-model="isDialogVisible" max-width="400">
      <v-card class="pa-2">
        <v-card-title class="text-h5">Leave Team?</v-card-title>
        <v-card-text>
          Are you sure you want to leave <strong>{{ teamStore.activeTeam?.name }}</strong>? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="isDialogVisible = false">Cancel</v-btn>
          <v-btn color="error" @click="handleLeaveTeam" :loading="isLoading">Leave</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useTeamStore } from '../stores/teamStore';

const authStore = useAuthStore();
const teamStore = useTeamStore();

const isDialogVisible = ref(false);
const isLoading = ref(false);

const handleLeaveTeam = async () => {
  isLoading.value = true;
  try {
    await teamStore.leaveTeam(teamStore.activeTeam._id);
    // Store redirection handle karel
  } catch (error) {
    alert(error.message || 'Could not leave the team.');
  } finally {
    isLoading.value = false;
    isDialogVisible.value = false;
  }
};

const userAvatar = computed(() => {
  const name = authStore.user?.firstName || 'User';
  return `https://ui-avatars.com/api/?name=${name.charAt(0)}&background=primary&color=fff&bold=true`;
});
</script>