<template>
  <v-card class="pa-4 mb-8" variant="outlined">
    <v-form @submit.prevent="submitLink">
      <v-text-field
        v-model="url"
        label="Paste a link here and press Enter"
        variant="solo-filled"
        flat
        prepend-inner-icon="mdi-link-plus"
        :error-messages="errorMessage"
        :loading="isLoading"
        hide-details="auto"
      ></v-text-field>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useLinkStore } from '../stores/linkStore';

const props = defineProps({
  teamId: {
    type: String,
    required: true
  }
});

const url = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const linkStore = useLinkStore();

const submitLink = async () => {
  if (!url.value) return;
  
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    await linkStore.addLink(props.teamId, url.value);
    url.value = ''; // Clear the input on success
  } catch (error) {
    errorMessage.value = error.error || 'Failed to add link.';
  } finally {
    isLoading.value = false;
  }
};
</script>