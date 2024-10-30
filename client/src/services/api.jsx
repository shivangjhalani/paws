import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Add auth token to all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const api = {
  // Auth endpoints
  login: (credentials) => axios.post(`${API_URL}/login`, credentials),
  signup: (userData) => axios.post(`${API_URL}/signup`, userData),
  logout: () => axios.post(`${API_URL}/logout`),
  
  // User endpoints
  getUserProfile: () => axios.get(`${API_URL}/user/profile`),
  
  // Pet endpoints
  getPets: () => axios.get(`${API_URL}/pets`),
  createPet: (petData) => axios.post(`${API_URL}/pets`, petData),
  likePet: (petId, userId) => axios.post(`${API_URL}/pets/${petId}/like`, { userId }),
  
  // Liked pets
  getLikedPets: (userId) => axios.get(`${API_URL}/users/${userId}/liked-pets`),
  
  // Adoption endpoints
  createAdoption: (adoptionData) => axios.post(`${API_URL}/adoptions`, adoptionData)
};

export default api;
