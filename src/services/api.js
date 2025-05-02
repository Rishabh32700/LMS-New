import axios from 'axios';
import { getToken } from '../utils/auth';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://api.yourlmsapp.com/v1', // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;