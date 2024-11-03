import api from './api';

export const pets = {
  // Get all available pets
  getAll: async () => {
    try {
      const response = await api.get('/pets');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching pets' };
    }
  },

  // Get a single pet by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/pets/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching pet details' };
    }
  },

  // Create a new pet listing (for rehomers)
  create: async (petData) => {
    try {
      const response = await api.post('/pets', petData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error creating pet listing' };
    }
  },

  // Update a pet listing (for rehomers)
  update: async (id, petData) => {
    try {
      const response = await api.put(`/pets/${id}`, petData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating pet listing' };
    }
  },

  // Delete a pet listing (for rehomers)
  delete: async (id) => {
    try {
      const response = await api.delete(`/pets/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error deleting pet listing' };
    }
  },

  // Like a pet (for adopters)
  like: async (id) => {
    try {
      const response = await api.post(`/pets/${id}/like`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error liking pet' };
    }
  },

  // Unlike a pet (for adopters)
  unlike: async (id) => {
    try {
      const response = await api.delete(`/pets/${id}/like`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error unliking pet' };
    }
  },

  // Get liked pets (for adopters)
  getLiked: async () => {
    try {
      const response = await api.get('/liked-pets');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching liked pets' };
    }
  },

  // Get rehomer's listings
  getMyListings: async () => {
    try {
      const response = await api.get('/my-listings');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching your listings' };
    }
  }
};
