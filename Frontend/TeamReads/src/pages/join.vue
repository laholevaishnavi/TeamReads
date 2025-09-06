<template>
  <div class="d-flex justify-center mt-12">
    <v-card width="420" class="pa-6">
      <h2 class="text-h6 mb-4">Join a Team</h2>
      <v-form @submit.prevent="onJoin">
        <v-text-field v-model="code" label="Invite Code" required />
        <v-btn :loading="loading" type="submit" color="primary" block>Join</v-btn>
      </v-form>
      <v-alert v-if="msg" type="success" class="mt-4">{{ msg }}</v-alert>
      <v-alert v-if="err" type="error" class="mt-4">{{ err }}</v-alert>
    </v-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeamsStore } from '@/store/teams'

const route = useRoute()
const router = useRouter()
const teams = useTeamsStore()
const code = ref('')
const loading = ref(false)
const msg = ref('')
const err = ref('')

onMounted(() => {
  code.value = route.query.code?.toString() || ''
})

const onJoin = async () => {
  loading.value = true
  msg.value = ''
  err.value = ''
  try {
    const team = await teams.joinTeam(code.value)
    msg.value = `Joined team: ${team.name}`
    setTimeout(() => router.push('/dashboard'), 800)
  } catch (e) {
    err.value = e?.response?.data?.error || 'Join failed'
  } finally {
    loading.value = false
  }
}
</script>