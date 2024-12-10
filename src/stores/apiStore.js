import { defineStore } from 'pinia';
import axios from 'axios';

// Set the base URL for axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export const useApiStore = defineStore('apiStore', {
    state: () => ({
        user: null,
        petTypes: [],
        vaccines: [],
        userPets: [],
        token: localStorage.getItem('token') || null,
    }),

    getters: {
        // Example getter to check if user is authenticated
        isAuthenticated(state) {
            return state.token !== null;
        },
    },

    actions: {
        // Register a new user
        async registerUser(data) {
            try {
                const response = await axios.post('/api/user/register', data);
                return response.data; // Handle response as needed
            } catch (error) {
                console.error('Registration error:', error);
                throw error;
            }
        },

        // Login a user
        async loginUser(data) {
            try {
                const response = await axios.post('/api/user/login', data);
                this.token = response.data.token; // Store token
                localStorage.setItem('token', this.token); // Persist token
                return response.data;
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },

        // Logout the user
        async logoutUser() {
            try {
                await axios.post('/api/user/logout', null, {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                this.token = null;
                localStorage.removeItem('token');
                return true;
            } catch (error) {
                console.error('Logout error:', error);
                throw error;
            }
        },

        // Fetch pet types (reusable method)
        async fetchPetTypes() {
            try {
                const response = await axios.get('/api/get_pet_type');
                this.petTypes = response.data;
                return response.data;
            } catch (error) {
                console.error('Error fetching pet types:', error);
                throw error;
            }
        },

        // Fetch vaccines (reusable method)
        async fetchVaccines() {
            try {
                const response = await axios.get('/api/get_vaccines');
                this.vaccines = response.data;
                return response.data;
            } catch (error) {
                console.error('Error fetching vaccines:', error);
                throw error;
            }
        },

        // Get user data by ID
        async getUserData(userId) {
            try {
                const response = await axios.get(`/api/user/${userId}`, {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                this.user = response.data;
                return response.data;
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        },

        // Get user's pets
        async getUserPets(userId) {
            try {
                const response = await axios.get(`/api/user/${userId}/pets`, {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                this.userPets = response.data;
                return response.data;
            } catch (error) {
                console.error('Error fetching user pets:', error);
                throw error;
            }
        },

        // Create a new pet
        async createPet(data) {
            try {
                const response = await axios.post('/api/user/create_pet', data, {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                return response.data;
            } catch (error) {
                console.error('Error creating pet:', error);
                throw error;
            }
        },

        // Edit pet details
        async editPet(userId, petId, data) {
            try {
                const response = await axios.patch(`/api/user/${userId}/edit_pet/${petId}`, data, {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                return response.data;
            } catch (error) {
                console.error('Error editing pet:', error);
                throw error;
            }
        },

        // Delete pet
        async deletePet(userId, petId) {
            try {
                const response = await axios.delete(`/api/user/${userId}/pet/delete_pet/${petId}`, {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                return response.data;
            } catch (error) {
                console.error('Error deleting pet:', error);
                throw error;
            }
        },

        // Create appointment for user
        async createAppointment(userId, data) {
            try {
                const response = await axios.post(`/api/user/create_appointment/${userId}`, data, {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                return response.data;
            } catch (error) {
                console.error('Error creating appointment:', error);
                throw error;
            }
        },

        // Get pet medical records
        async getPetMedicalRecords(petId) {
            try {
                const response = await axios.get(`/api/user/pet/get_records/${petId}`, {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching pet medical records:', error);
                throw error;
            }
        },
    },
});
