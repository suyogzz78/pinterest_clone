// frontend/src/utils/axiosConfig.js
import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;