import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = {
  // User endpoints
  signup: (userData) => axios.post(`${API_URL}/signup`, userData),
  
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
