import { defineStore } from 'pinia';
import apiClient from '../services/api';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await apiClient.post('/auth/login', credentials);
        this.user = response.data.user;
        this.isAuthenticated = true;
        // Redirect to the dashboard after successful login
        router.push('/dashboard');
      } catch (error) {
        // Let the component handle the error display
        throw error.response.data;
      }
    },

    async signup(userInfo) {
      try {
        await apiClient.post('/auth/signup', userInfo);
        // We don't automatically log them in, we redirect to login page
      } catch (error) {
        throw error.response.data;
      }
    },
    
    async logout() {
      try {
        await apiClient.post('/auth/logout');
        this.user = null;
        this.isAuthenticated = false;
        // Redirect to the landing page after logout
        router.push('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  },
});