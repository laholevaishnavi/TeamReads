<template>
  <v-dialog :model-value="isVisible" @update:model-value="$emit('update:isVisible', $event)" max-width="500">
    <v-card class="pa-4">
      <v-card-title class="text-h5 font-weight-bold">Join a Team</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="teamCode"
            label="Team Code"
            variant="outlined"
            required
            :error-messages="errorMessage"
            placeholder="e.g., BFXUUK"
          ></v-text-field>
          <v-card-actions class="pa-0 mt-4">
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="$emit('update:isVisible', false)">Cancel</v-btn>
            <v-btn color="primary" type="submit" :loading="loading">Join Team</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useTeamStore } from '../stores/teamStore';

defineProps(['isVisible']);
const emit = defineEmits(['update:isVisible']);

const teamCode = ref('');
const loading = ref(false);
const errorMessage = ref('');
const teamStore = useTeamStore();

const submit = async () => {
  if (!teamCode.value) {
    errorMessage.value = 'Team code is required.';
    return;
  }
  loading.value = true;
  errorMessage.value = '';
  try {
    await teamStore.joinTeam({ code: teamCode.value });
    emit('update:isVisible', false);
    teamCode.value = '';
  } catch (error) {
    errorMessage.value = error.message || 'Could not join team.';
  } finally {
    loading.value = false;
  }
};
</script>