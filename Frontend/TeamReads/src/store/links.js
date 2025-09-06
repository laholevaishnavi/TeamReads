import { defineStore } from "pinia";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export const useLinksStore = defineStore("links", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetch(teamId) {
      this.loading = true;
      try {
        const { data } = await axios.get(`${API_BASE}/links/${teamId}`);
        this.items = data;
      } finally {
        this.loading = false;
      }
    },
    async add(teamId, url) {
      const user = JSON.parse(localStorage.getItem("user")); // किंवा authStore वापर
      const { data } = await axios.post(`${API_BASE}/links`, {
        url,
        teamId,
        userId: user._id,
      });
      this.items.unshift(data); // UI मध्ये लगेच दाखवण्यासाठी
      return data;
    },
  },

});



// import { defineStore } from 'pinia'
// import { apiAddLink, apiGetTeamLinks } from '@/api/links'
// import { useAuthStore } from './auth'


// export const useLinksStore = defineStore('links', {
// state: () => ({
// items: [],
// loading: false
// }),
// actions: {
// async fetch(teamId) {
// this.loading = true
// try {
// const { data } = await apiGetTeamLinks(teamId)
// this.items = data
// } finally {
// this.loading = false
// }
// },
// async add(teamId, url) {
// const auth = useAuthStore()
// const { data } = await apiAddLink({ teamId, url, userId: auth.user._id })
// this.items.unshift(data)
// return data
// }
// }
// })