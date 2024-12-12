<template>
  <div v-if="isMobile">
    <h1 class="text-2xl font-bold my-5">{{ headingText }}</h1>
    <div class="flex flex-col gap-5">
      <PetComponent v-for="pet in pets" :key="pet.id" :pet="pet" @deleteEmit="handleDeleteEmit"/>
    </div>
    <div class="mb-48"></div>
  </div>

  <div v-if="!isMobile" class="w-11/12 mx-auto">
    <div class="flex gap-x-3 items-center justify-between">
      <h1 class="text-2xl font-bold my-5">{{ headingText }}</h1>
      <div class="flex gap-5" v-if="!isVet">

        <button @click="toAppointment"
            class="text-[var(--main-color)] text-md outline outline-2 outline-[var(--main-color)] py-3 px-5 rounded-md cursor-pointer "
        >
          Create Appointment
        </button>
        <button @click="toRegister"
            class="bg-[var(--main-color)] py-3 px-5 rounded-md text-white text-md cursor-pointer "

        >
          Register New Pet
        </button>


      </div>
    </div>

    <div class="gap-5 grid grid-cols-2">
      <PetComponent v-for="pet in pets" :key="pet.id" :pet="pet" @deleteEmit="handleDeleteEmit"/>
    </div>
    <div class="mb-48"></div>
  </div>
</template>


<script>
import PetComponent from "@/components/PetComponent.vue";
import axios from "axios";
import {updateLayout} from "@/helpers/layoutHelper";

export default {
  name: "PetsView",
  components: {
    PetComponent,
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Clean up event listener
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },

  props: ['userId'],

  data() {
    return {
      isVet: false,
      isMobile: updateLayout(),
      pets: [],
      accountType: localStorage.getItem('account_type') || '',  // Get account type from localStorage
    };
  },

  computed: {
    // Compute the heading text based on account type
    headingText() {
      return this.accountType === 'vets' ? 'User Registered Pets' : 'Your Pets';
    }
  },

  mounted() {
    if(localStorage.getItem('account_type') === 'vets') {
      this.isVet = true;
    }
    else{
      this.isVet = false
    }
    this.getPets();
    const user_id = this.userId || localStorage.getItem('user_id');
    this.pets = JSON.parse(localStorage.getItem(`pets_${user_id}`));
  },

  methods: {
    toAppointment(){
      this.$router.push('/dashboard/create_appointment')
    },
    toRegister(){
      this.$router.push('/dashboard/pets/register')
    },

    async getPets() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');
      const user_id = this.userId || localStorage.getItem('user_id');

      try {
        const response = await axios.get(`${url}/api/user/${user_id}/pets`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });

        const pets_name = `pets_${user_id}`;
        const petsData = response.data.pets;

        // Update localStorage
        localStorage.setItem(pets_name, JSON.stringify(petsData));

        // Update the reactive pets array
        this.pets = petsData;

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

        if (response.data) {
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
