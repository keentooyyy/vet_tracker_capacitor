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
  mounted() {
    this.getPets();
    const user_id = this.userId || this.currentUserId;
    this.pets = JSON.parse(localStorage.getItem(`pets_${user_id}`));
    // console.log(this.pets);
  },
  methods: {
    async getPets() {

      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');
      const user_id = this.currentUserId

      try {
        const response = await axios.get(`${url}/api/user/${user_id}/pets`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });


        const pets_name = `pets_${user_id}`
        localStorage.setItem(pets_name, JSON.stringify(response.data.pets))


      } catch (err) {
        console.log('API Request Error', err);
      }

    },
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
    }




  },

};
</script>
<style scoped>

</style>
