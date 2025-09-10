<template>
  <v-row>
    <v-col cols="12" md="3">
      <TeamSidebar />
    </v-col>

    <v-col cols="12" md="9">
      <div v-if="teamStore.isLoading" class="text-center mt-12">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <p class="mt-4">Loading Team Details...</p>
      </div>
      
      <div v-else-if="teamStore.activeTeam">
        <h1 class="text-h3 font-weight-bold">{{ teamStore.activeTeam.name }}</h1>
        <p class="text-body-1 mt-2 text-grey-darken-1">
          Share and discover links with your team. Use code <strong>{{ teamStore.activeTeam.code }}</strong> to invite others.
        </p>

        <p class="text-body-2 mt-4" style="white-space: pre-wrap;">
          {{ teamStore.activeTeam.description }}
        </p>
        
        <v-divider class="my-8"></v-divider>

        <AddLinkForm :team-id="teamId" />

        <div class="d-flex justify-space-between align-center mb-4">
          <h2 class="text-h5 font-weight-medium">Shared Links</h2>
          <v-text-field
            v-model="searchQuery"
            label="Search links..."
            variant="outlined"
            density="compact"
            hide-details
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px;"
          ></v-text-field>
        </div>

        <div v-if="linkStore.isLoading">
          <v-progress-linear indeterminate color="primary"></v-progress-linear>
        </div>
        <div v-else-if="linkStore.links.length > 0">
          <LinkCard v-for="link in linkStore.links" :key="link._id" :link="link" />
        </div>
        <div v-else class="text-center text-grey-darken-1 py-12">
          <v-icon size="48" class="mb-4">mdi-link-off</v-icon>
          <p>No links have been shared in this team yet.</p>
          <p v-if="searchQuery">Try a different search term.</p>
        </div>
      </div>
      
      <div v-else>
        <h1 class="text-h4 font-weight-medium text-red">Team could not be loaded.</h1>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTeamStore } from '../stores/teamStore';
import { useLinkStore } from '../stores/linkStore';
import AddLinkForm from '../components/AddLinkForm.vue';
import LinkCard from '../components/LinkCard.vue';
import TeamSidebar from '../components/TeamSidebar.vue'; // ==> SIDEBAR IMPORT KARA

const route = useRoute();
const teamStore = useTeamStore();
const linkStore = useLinkStore();

const teamId = route.params.teamId;
const searchQuery = ref('');
let debounceTimer = null;

onMounted(() => {
  teamStore.fetchTeamById(teamId);
  linkStore.fetchLinks(teamId);
});

// Watch for changes in the route to refetch data when user switches teams from sidebar
watch(() => route.params.teamId, (newId) => {
  if (newId) {
    teamStore.fetchTeamById(newId);
    linkStore.fetchLinks(newId);
  }
});

watch(searchQuery, (newQuery) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    linkStore.fetchLinks(teamId, newQuery);
  }, 500);
});
</script>