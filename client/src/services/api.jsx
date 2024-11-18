import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  signup: async (userData) => {
    try {
      const response = await api.post('/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during signup' };
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', response.data.userType);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Invalid credentials' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching user profile' };
    }
  },
};

export default api;
export { pets } from './petapi'
