<template>
  <div class="pa-6 mx-auto" style="max-width: 900px;">
    <div class="d-flex align-center mb-4">
      <v-btn variant="text" to="/dashboard" prepend-icon="mdi-arrow-left">Back</v-btn>
      <v-spacer />
      <v-text-field
        v-model="inviteCode"
        label="Invite Code"
        readonly
        hide-details
        density="compact"
        style="max-width: 220px;"
        class="mr-2"
      />
      <v-btn @click="copyInvite" prepend-icon="mdi-content-copy" variant="outlined">Copy Invite</v-btn>
    </div>

    <v-card class="pa-4 mb-6">
      <v-form @submit.prevent="onAdd">
        <v-text-field v-model="url" label="Paste a URL" required />
        <v-btn :loading="adding" type="submit" color="primary">Post Link</v-btn>
      </v-form>
    </v-card>

    <div v-if="links.loading" class="d-flex justify-center my-8">
      <v-progress-circular indeterminate size="40" />
    </div>

    <v-empty-state
      v-else-if="!links.items.length"
      headline="No links yet"
      title="Post the first link for your team"
      />

    <v-container v-else fluid class="pa-0">
      <v-row>
        <v-col cols="12" v-for="item in links.items" :key="item._id">
          <v-card class="pa-4 mb-3">
            <div class="d-flex align-start">
              <div class="flex-grow-1">
                <div class="text-subtitle-1 font-weight-bold">{{ item.title }}</div>
                <div class="text-body-2 mb-2">{{ item.description }}</div>
                <a :href="item.url" target="_blank" rel="noopener">{{ item.url }}</a>
              </div>
              <div class="ml-4 text-no-wrap text-caption">
                {{ new Date(item.createdAt).toLocaleString() }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLinksStore } from '@/store/links'
import { apiGetTeam } from '@/api/teams'

const route = useRoute()
const teamId = route.params.id
const links = useLinksStore()
const url = ref('')
const adding = ref(false)
const inviteCode = ref('')

onMounted(async () => {
  links.fetch(teamId)
  const { data } = await apiGetTeam(teamId)
  inviteCode.value = data.code
})

const onAdd = async () => {
  adding.value = true
  try {
    await links.add(teamId, url.value)
    url.value = ''
  } finally {
    adding.value = false
  }
}

const copyInvite = async () => {
  const link = `${window.location.origin}/join?code=${inviteCode.value}`
  await navigator.clipboard.writeText(link)
}
</script>