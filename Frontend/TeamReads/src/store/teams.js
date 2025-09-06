import { defineStore } from 'pinia'
import { apiCreateTeam, apiJoinTeam, apiGetMyTeams } from '@/api/teams'
import { useAuthStore } from './auth'

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    myTeams: []
  }),
  actions: {
    async fetchMyTeams() {
      const auth = useAuthStore()
      if (!auth.user) return
      try {
        const { data } = await apiGetMyTeams(auth.user._id)
        this.myTeams = data
      } catch (err) {
        console.error("Error fetching teams:", err)
      }
    },

    async createTeam(name) {
      const auth = useAuthStore()
      const { data } = await apiCreateTeam({ name, userId: auth.user._id })
     
      return data
    },

    async joinTeam(code) {
      const auth = useAuthStore()
      const { data } = await apiJoinTeam({ code, userId: auth.user._id })
      return data
    }
  }
})






















// import { defineStore } from 'pinia'
// import { apiCreateTeam, apiJoinTeam, apiGetMyTeams } from '@/api/teams'
// import { useAuthStore } from './auth'


// export const useTeamsStore = defineStore('teams', {
// state: () => ({
// myTeams: []
// }),
// actions: {
// async fetchMyTeams() {
// const auth = useAuthStore()
// if (!auth.user) return
// try {
// const { data } = await apiGetMyTeams(auth.user._id)
// this.myTeams = data
// } catch {
// // If no endpoint exists, keep current state (will be built from actions below)
// }
// },
// async createTeam(name) {
// const auth = useAuthStore()
// const { data } = await apiCreateTeam({ name, userId: auth.user._id })
// // optimistic: push to list if listing endpoint isn't available
// if (!this.myTeams.find(t => t._id === data._id)) this.myTeams.push(data)
// return data
// },
// async joinTeam(code) {
// const auth = useAuthStore()
// const { data } = await apiJoinTeam({ code, userId: auth.user._id })
// if (!this.myTeams.find(t => t._id === data._id)) this.myTeams.push(data)
// return data
// }
// }
// })