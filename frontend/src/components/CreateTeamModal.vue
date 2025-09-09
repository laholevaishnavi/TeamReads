<template>
  <v-dialog :model-value="isVisible" @update:model-value="$emit('update:isVisible', $event)" max-width="500">
    <v-card class="pa-4">
      <v-card-title class="text-h5 font-weight-bold">Create a New Team</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="teamName"
            label="Team Name"
            variant="outlined"
            required
            :error-messages="errorMessage"
          ></v-text-field>

          <v-textarea
            v-model="teamDescription"
            label="Team Description"
            variant="outlined"
            required
            rows="3"
            hint="Minimum 40 characters. This helps the AI find relevant articles."
            class="mt-4"
            :error-messages="descriptionError"
          ></v-textarea>


          <v-card-actions class="pa-0 mt-4">
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="$emit('update:isVisible', false)">Cancel</v-btn>
            <v-btn color="primary" type="submit" :loading="loading">Create</v-btn>
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

const teamName = ref('');
const teamDescription = ref('');
const loading = ref(false);
const errorMessage = ref('');
const descriptionError = ref('');
const teamStore = useTeamStore();

const submit = async () => {
  if (!teamName.value) {
    errorMessage.value = 'Team name is required.';
    return;
  }
  loading.value = true;
  errorMessage.value = '';
  descriptionError.value = '';
    let hasError = false;
  if (!teamName.value) {
    errorMessage.value = 'Team name is required.';
    hasError = true;
  }
  if (teamDescription.value.length < 40) {
    descriptionError.value = 'Description must be at least 40 characters.';
    hasError = true;
  }
  if (hasError) {
    return; // Stop the function if there's an error
  }

  try {
    await teamStore.createTeam({ name: teamName.value, description: teamDescription.value });
    emit('update:isVisible', false); // Close the modal on success
    teamName.value = ''; // Reset form
    teamDescription.value = '';
  } catch (error) {
    errorMessage.value = error.error || 'Could not create team.';
  } finally {
    loading.value = false;
  }
};
</script>