<template>
  <div v-if="isMobile">
    <h1 class="text-2xl font-bold my-5">Register Pet</h1>

    <div class="flex flex-col gap-y-4">
      <input
          v-model="pet_name"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
          placeholder="Enter Your Pet Name" type="text"/>
      <div class="flex gap-x-3">

        <!-- Conditionally render the dropdown or message if no pet types are available -->
        <template v-if="pet_types_array.length > 0">
          <select v-model="selectedOption"
                  class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md w-3/6">
            <option v-for="pet_type in pet_types_array" :key="pet_type.id" :value="pet_type.type">
              {{ pet_type.type }}
            </option>
          </select>
        </template>
        <template v-else>
          <p class="text-lg text-red-500">No species registered.</p>
        </template>

        <input
            v-model="pet_birthdate"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-sm w-3/6"
            placeholder="Enter Your Pet Birthdate" type="date"/>

      </div>

      <input
          v-model="pet_breed"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
          placeholder="Enter Your Pet Breed" type="text"/>

      <div class="w-full flex flex-col gap-y-4 mt-5">
        <button class="bg-[var(--main-color)] py-3 rounded-md text-white text-xl cursor-pointer" @click="createPet">
          Submit
        </button>

        <button
            class="text-[var(--main-color)] text-xl outline outline-2 outline-[var(--main-color)] py-3 rounded-md cursor-pointer"
            @click="goBack">Back
        </button>

      </div>
    </div>
  </div>
  <div v-if="!isMobile" class="w-11/12 mx-auto">
    <h1 class="text-2xl font-bold my-5">Register Pet</h1>

    <div class="flex flex-col gap-y-4">
      <input
          v-model="pet_name"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
          placeholder="Enter Your Pet Name" type="text"/>
      <div class="flex gap-x-3">

        <!-- Conditionally render the dropdown or message if no pet types are available -->
        <template v-if="pet_types_array.length > 0">
          <select v-model="selectedOption"
                  class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md w-3/6">
            <option v-for="pet_type in pet_types_array" :key="pet_type.id" :value="pet_type.type">
              {{ pet_type.type }}
            </option>
          </select>
        </template>
        <template v-else>
          <p class="text-lg text-red-500">No species registered.</p>
        </template>

        <input
            v-model="pet_birthdate"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-sm w-3/6"
            placeholder="Enter Your Pet Birthdate" type="date"/>

      </div>

      <input
          v-model="pet_breed"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
          placeholder="Enter Your Pet Breed" type="text"/>

      <div class="w-full flex  gap-5 mt-5">
        <button class="bg-[var(--main-color)] py-3 rounded-md text-white text-xl cursor-pointer w-full" @click="createPet">
          Submit
        </button>

        <button
            class="text-[var(--main-color)] text-xl outline outline-2 outline-[var(--main-color)] py-3 rounded-md cursor-pointer w-full"
            @click="goBack">Back
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {updateLayout} from "@/helpers/layoutHelper";

export default {
  name: "EditPetView",

  mounted() {
    this.populatePetTypes();
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Clean up event listener
  },

  updated() {
    if (this.pet_types_array.length > 0 && !this.isGetPetUpdated) {
      this.selectedOption = this.pet_types_array[0].type; // Set default selection to the first type
      this.isGetPetUpdated = true;
    }
  },

  data() {
    return {
      isMobile: updateLayout(),
      isGetPetUpdated: false,

      selectedOption: '',
      pet_types_array: [],

      pet_name: '',
      pet_breed: '',
      pet_birthdate: '',
      pet_type: ''
    };
  },

  methods: {
    goBack() {
      this.$router.back();
    },

    populatePetTypes() {
      const petTypesFromStorage = localStorage.getItem('pet_types');
      if (petTypesFromStorage) {
        this.pet_types_array = JSON.parse(petTypesFromStorage);
      } else {
        this.pet_types_array = [];
      }
    },

    async createPet() {
      const url = process.env.VUE_APP_API_URL;
      const id = localStorage.getItem('user_id');
      const bearer = localStorage.getItem('bearer_token');
      const selectedPet = this.pet_types_array.find(pet => pet.type === this.selectedOption);

      try {
        const response = await axios.post(`${url}/api/user/create_pet`, {
          user_id: id,
          name: this.pet_name,
          breed: this.pet_breed,
          birthdate: this.pet_birthdate,
          pet_type_id: selectedPet ? selectedPet.id : null, // Handle the case where no pet type is selected
        }, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        });

        if (response) {
          this.$router.push('/refresh').then(() => {
            this.$router.push('/dashboard');
          });
        }
      } catch (err) {
        this.error = err;
        console.log('API request Failed', err);
      }
    }
  }
};
</script>

<style scoped>
</style>
