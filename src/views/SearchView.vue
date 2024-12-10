<template>
  <h1 class="text-2xl font-bold my-5">Search for Pets</h1>

  <input
      type="text"
      v-model="searchQuery"
      placeholder="Search Pets"
      class="border px-4 py-2 rounded-lg mb-5"
  />

  <!-- Display this message when searchQuery is empty -->
  <p v-if="searchQuery === ''" class="text-gray-500 italic">
    Start typing to search for pets
  </p>

  <!-- Show pets only if there is a search query or filtered pets -->
  <div v-if="searchQuery !== '' && filteredPets.length > 0" class="flex flex-col gap-5">
    <PetComponent
        v-for="pet in filteredPets"
        :key="pet.id"
        :pet="pet"
        @deleteEmit="handleDeleteEmit"
    />
  </div>

  <!-- Display a message if no pets match the search query -->
  <p v-if="searchQuery !== '' && filteredPets.length === 0" class="text-gray-500 italic">
    No pets found matching your search.
  </p>
</template>

<script>
import PetComponent from "@/components/PetComponent.vue";
import axios from "axios";

export default {
  name: "SearchView",
  components: { PetComponent },
  data() {
    return {
      pets: [], // Stores the original list of pets
      pet_id: '',
      searchQuery: '', // This binds to the input for filtering
    };
  },
  created() {
    this.getUserPets();
  },
  methods: {
    // Fetch pets from the API
    async getUserPets() {
      const userid = localStorage.getItem('user_id');
      this.pets = JSON.parse(localStorage.getItem(`pets_${userid}`));
    },

    // Handle pet deletion
    async handleDeleteEmit(payload) {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');
      const userid = localStorage.getItem('user_id');

      // Retrieve and parse local storage data
      const pets_local_store = JSON.parse(localStorage.getItem(`pets_${userid}`)) || [];

      // Find the index of the pet to delete
      const petIndex = pets_local_store.findIndex(pet => pet.id === payload);

      if (petIndex !== -1) {
        // Remove the pet from the array
        pets_local_store.splice(petIndex, 1);

        // Update local storage
        localStorage.setItem(`pets_${userid}`, JSON.stringify(pets_local_store));

        console.log(`Pet with ID ${payload} removed from local storage.`);
      } else {
        console.log(`Pet with ID ${payload} not found in local storage.`);
        return;
      }

      try {
        // Delete pet from API
        const response = await axios.delete(`${url}/api/user/${userid}/pet/delete_pet/${payload}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });

        if (response.data){
          this.$router.push('/refresh').then(() => {
            this.$router.push('/dashboard'); // Navigate back to the same route
          });
        }
      } catch (error) {
        console.error(`Error deleting pet with ID ${payload} from the API:`, error);
      }
    },
  },
  computed: {
    // Filter pets based on the search query
    filteredPets() {
      if (this.searchQuery === '') {
        return [];
      } else {
        return this.pets.filter(pet =>
            pet.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
  },
}
</script>

<style scoped>
/* Add any necessary styles */
</style>
