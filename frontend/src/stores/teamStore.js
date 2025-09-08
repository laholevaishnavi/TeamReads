import { defineStore } from 'pinia';
import apiClient from '../services/api';
import router from '../router';

export const useTeamStore = defineStore('team', {
  state: () => ({
    teams: [],
    activeTeam: null,
    isLoading: false,
  }),

  actions: {
    // Fetches all teams for the logged-in user
    async fetchUserTeams() {
      this.isLoading = true;
      try {
        const response = await apiClient.get('/teams');
        this.teams = response.data;
      } catch (error) {
        console.error("Failed to fetch user's teams:", error);
      } finally {
        this.isLoading = false;
      }
    },

    // Creates a new team
    async createTeam(teamData) {
      try {
        const response = await apiClient.post('/teams', teamData);
        this.teams.push(response.data);
      } catch (error) {
        console.error('Failed to create team:', error);
        throw error.response.data;
      }
    },
    
    // Joins an existing team
    async joinTeam(teamCode) {
      try {
        const response = await apiClient.post('/teams/join', teamCode);
        this.teams.push(response.data.team);
      } catch (error)
{
        console.error('Failed to join team:', error);
        throw error.response.data;
      }
    },

    // Fetches a single team by its ID
    async fetchTeamById(teamId) {
      this.isLoading = true;
      this.activeTeam = null;
      try {
        const response = await apiClient.get(`/teams/${teamId}`);
        this.activeTeam = response.data;
      } catch (error) {
        console.error("Failed to fetch team details:", error);
      } finally {
        this.isLoading = false;
      }
    },

    // Allows a user to leave a team
    async leaveTeam(teamId) {
      try {
        await apiClient.delete(`/teams/${teamId}/leave`);
        this.teams = this.teams.filter(team => team._id !== teamId);
        router.push('/dashboard');
      } catch (error) {
        console.error("Failed to leave team:", error);
        throw error.response.data;
      }
    }
  },
});