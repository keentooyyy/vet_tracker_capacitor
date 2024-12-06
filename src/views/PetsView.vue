<template>
  <h1 class="text-2xl font-bold my-5">Your Pets</h1>
  <div class="flex flex-col">
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
  data() {
    return {
      pets: [],
    };
  },
  created() {

    this.getUserPets();


  },
  methods: {
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


        // console.log(usePetStore.getPets)

        this.pets = response.data.pets; // Save the pets data in the `pets` array
      } catch (err) {
        console.log('API request Failed', err);
      }
    },
    handleDeleteEmit(){

    }
  },

};
</script>
<style scoped>

</style>
