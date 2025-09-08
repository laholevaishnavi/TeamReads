import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend's base URL
  withCredentials: true // This is crucial for sending cookies
});

export default apiClient;