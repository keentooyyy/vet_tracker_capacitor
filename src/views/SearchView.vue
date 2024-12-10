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
    // this.getUserPets();
  },
  methods: {
    // Fetch pets from the API
    async getUserPets() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');
      const id = localStorage.getItem('user_id');
      try {
        const response = await axios.get(`${url}/api/user/${id}/pets`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });
        this.pets = response.data.pets;
      } catch (err) {
        console.log('API request Failed', err);
      }
    },

    // Handle pet deletion
    async handleDeleteEmit(payload) {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');
      const id = localStorage.getItem('user_id');
      try {
        const response = await axios.delete(`${url}/api/user/${id}/pet/delete_pet/${payload}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });
        console.log(response);
        this.$router.push('/refresh').then(() => {
          this.$router.push('/dashboard/pets');
        });
      } catch (err) {
        console.log('API request Failed', err);
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
