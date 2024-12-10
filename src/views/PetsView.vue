<template>
  <div>
    <h1 class="text-2xl font-bold my-5">Your Pets</h1>


    <div class="flex flex-col gap-5 lg:hidden">
      <PetComponent v-for="pet in pets" :key="pet.id" :pet="pet" @deleteEmit="handleDeleteEmit"/>
    </div>


  </div>

  <div class="gap-5 hidden lg:grid grid-cols-2 w-11/12 mx-auto">
    <PetComponent v-for="pet in pets" :key="pet.id" :pet="pet" @deleteEmit="handleDeleteEmit"/>
  </div>

</template>

<script>
import PetComponent from "@/components/PetComponent.vue";
import axios from "axios";


export default {
  name: "PetsView",
  components: {
    PetComponent,
  },

  props: ['userId'],

  data() {
    return {
      pets: [],
      currentUserId: localStorage.getItem('user_id')

    };
  },
  created() {

    this.getUserPets();


  },
  methods: {
    async getUserPets() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');

      const userId = this.userId || this.currentUserId;

      // Check if the pets data is already in localStorage
      const storedPets = localStorage.getItem(`pets_${userId}`);

      if (storedPets) {
        // If the pets data exists in localStorage, parse and use it
        this.pets = JSON.parse(storedPets);
      } else {
        try {
          const response = await axios.get(`${url}/api/user/${userId}/pets`, {
            headers: {
              'Authorization': `Bearer ${bearer}`,
            },
          });

          // Save the fetched pets data to localStorage
          localStorage.setItem(`pets_${userId}`, JSON.stringify(response.data.pets));

          // Update the pets data in the component
          this.pets = response.data.pets;

          console.log('Fetched pets data from API:', this.pets);
        } catch (err) {
          console.log('API request Failed', err);
        }
      }
    },
    async handleDeleteEmit(payload) {
      /*
      * api/user/{user_id}/pet/delete_pet/{pet_id}
      *
      * */
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

        // Check if the pet exists in localStorage and remove it
        const storedPets = JSON.parse(localStorage.getItem('pets_1')) || [];
        const updatedPets = storedPets.filter(pet => pet.id !== payload); // Remove the pet with the matching id

        // Update localStorage with the new pets array
        localStorage.setItem('pets_1', JSON.stringify(updatedPets));

        // Refresh the route to reflect changes
        this.$router.push('/refresh').then(() => {
          this.$router.push('/dashboard'); // Navigate back to the dashboard
        });
      } catch (err) {
        console.log('API request Failed', err);
      }
    }


  },

};
</script>
<style scoped>

</style>
