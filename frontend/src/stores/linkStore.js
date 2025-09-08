import { defineStore } from 'pinia';
import apiClient from '../services/api';

export const useLinkStore = defineStore('link', {
  state: () => ({
    links: [],
    isLoading: false,
  }),

  actions: {
    // Fetches links for a specific team, with an optional search query
    async fetchLinks(teamId, searchQuery = '') {
      this.isLoading = true;
      try {
        const response = await apiClient.get(`/teams/${teamId}/links`, {
          params: { search: searchQuery }
        });
        this.links = response.data;
      } catch (error) {
        console.error("Failed to fetch links:", error);
        this.links = []; // Clear links on error
      } finally {
        this.isLoading = false;
      }
    },

    // Adds a new link to a team
    async addLink(teamId, url) {
      try {
        const response = await apiClient.post(`/teams/${teamId}/links`, { url });
        // Add the new link to the top of the list for instant UI update
        this.links.unshift(response.data);
      } catch (error) {
        console.error('Failed to add link:', error);
        throw error.response.data;
      }
    },
    
    // Deletes a link
    async deleteLink(linkId) {
      try {
        await apiClient.delete(`/links/${linkId}`);
        // Remove the link from the state for instant UI update
        this.links = this.links.filter(link => link._id !== linkId);
      } catch (error) {
        console.error('Failed to delete link:', error);
        throw error.response.data;
      }
    }
  },
});