<template>
  <v-app>
    <!-- ✅ Top Navbar -->
    <!-- <v-app-bar flat color="surface">
      <v-toolbar-title class="font-weight-bold">🚀 DevSphere</v-toolbar-title>
      <v-spacer />
      <div class="text-subtitle-1 mr-6">Teams Dashboard</div> -->

      <!-- User Menu -->
      <!-- <v-menu>
        <template #activator="{ props }">
          <v-avatar v-bind="props" color="primary" size="36" class="cursor-pointer">
            <span class="white--text">U</span>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item title="Profile" prepend-icon="mdi-account" />
          <v-list-item title="Logout" prepend-icon="mdi-logout" @click="logout" />
        </v-list>
      </v-menu>
    </v-app-bar> -->

    <!-- ✅ Main Content -->
    <v-main>
      <div class="pa-6 mx-auto" style="max-width: 1200px;">

        <!-- Section 1: Teams -->
        <div class="mt-10">
          <h2 class="text-h5 mb-2">Your Teams</h2>
          <p class="text-body-2 mb-6">Manage and explore your teams below.</p>

          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="t in teams.myTeams" :key="t._id">
              <v-card class="pa-4 d-flex flex-column" rounded="xl" elevation="2">
                <div class="d-flex align-center mb-3">
                  <v-icon color="primary" class="mr-2">mdi-account-group</v-icon>
                  <div class="text-h6">{{ t.name }}</div>
                </div>
                <div class="text-caption mb-3">Code: <code>{{ t.code }}</code></div>
                <v-btn :to="`/team/${t._id}`" color="primary" class="mt-auto" block>Open</v-btn>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <v-divider class="my-10" />

        <!-- Section 2: Create / Join -->
        <div>
          <h2 class="text-h5 mb-6">Create or Join a Team</h2>
          <v-row>
            <!-- Create Team -->
            <v-col cols="12" md="6">
              <v-card class="pa-6" rounded="xl" elevation="2">
                <h3 class="text-subtitle-1 mb-3">
                  <v-icon class="mr-2" color="primary">mdi-plus-circle</v-icon> Create Team
                </h3>
                <v-form @submit.prevent="onCreate">
                  <v-text-field v-model="createName" label="Team Name" required />
                  <v-btn :loading="creating" type="submit" color="primary" block>Create</v-btn>
                </v-form>
              </v-card>
            </v-col>

            <!-- Join Team -->
            <v-col cols="12" md="6">
              <v-card class="pa-6" rounded="xl" elevation="2">
                <h3 class="text-subtitle-1 mb-3">
                  <v-icon class="mr-2" color="primary">mdi-login</v-icon> Join Team
                </h3>
                <v-form @submit.prevent="onJoin">
                  <v-text-field v-model="joinCode" label="Invite Code" required />
                  <v-btn :loading="joining" type="submit" color="primary" block>Join</v-btn>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTeamsStore } from '@/store/teams'

const teams = useTeamsStore()
const createName = ref('')
const joinCode = ref('')
const creating = ref(false)
const joining = ref(false)

onMounted(() => {
  teams.fetchMyTeams()
})

const onCreate = async () => {
  creating.value = true
  try {
    await teams.createTeam(createName.value)
    createName.value = ''
    await teams.fetchMyTeams()
  } finally {
    creating.value = false
  }
}

const onJoin = async () => {
  joining.value = true
  try {
    await teams.joinTeam(joinCode.value)
    joinCode.value = ''
    await teams.fetchMyTeams()
  } finally {
    joining.value = false
  }
}

const logout = () => {
  console.log('logout clicked')
}
</script>
