<template>
  <v-card class="mb-4" variant="tonal">
    <v-row no-gutters>
      <v-col cols="12" sm="3" v-if="link.image">
        <v-img :src="link.image" height="150" cover class="rounded-l"></v-img>
      </v-col>
      <v-col>
        <div class="pa-4">
          <v-card-title class="font-weight-bold text-wrap pa-0">
            {{ link.title }}
          </v-card-title>
          <v-card-subtitle class="pa-0 mt-1">
            <a :href="link.url" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-primary">{{ link.url }}</a>
          </v-card-subtitle>
          <v-card-text class="pa-0 mt-3">
            {{ link.description }}
          </v-card-text>
          <v-card-actions class="pa-0 mt-3">
            <v-avatar size="24" class="mr-2">
              <span class="text-caption">{{ link.userId.firstName.charAt(0) }}</span>
            </v-avatar>
            <span class="text-body-2 text-grey-darken-1">
              Shared by {{ link.userId.firstName }}
            </span>
            <v-spacer></v-spacer>
            <v-btn
              icon="mdi-delete-outline"
              variant="text"
              size="small"
              @click="handleDelete"
              :loading="isDeleting"
            ></v-btn>
          </v-card-actions>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useLinkStore } from '../stores/linkStore';

const props = defineProps({
  link: {
    type: Object,
    required: true
  }
});

const linkStore = useLinkStore();
const isDeleting = ref(false);

const handleDelete = async () => {
  isDeleting.value = true;
  try {
    await linkStore.deleteLink(props.link._id);
    // The store will handle removing it from the list
  } catch (error) {
    alert('You can only delete your own links.'); // Simple error handling
  } finally {
    isDeleting.value = false;
  }
};
</script>