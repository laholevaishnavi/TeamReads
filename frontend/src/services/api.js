import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // backend's base URL
  withCredentials: true // crucial for sending cookies
});

export default apiClient;