<template>
  <div>
    <h1 class="text-2xl font-bold my-5">Register Pet</h1>

    <div class="flex flex-col gap-y-4">
      <input
          v-model="pet_name"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
          placeholder="Enter Your Pet Name" type="text"/>
      <div class="flex gap-x-3">

        <select v-model="selectedOption"
                class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md w-3/6">
          <option v-for="pet_type in pet_types_array" :key="pet_type.id" :value="pet_type.type">{{
              pet_type.type
            }}
          </option>
        </select>

        <input
            v-model="pet_birthdate "
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
</template>

<script>
import axios from "axios";


export default {
  name: "EditPetView",

  created() {
    this.getPetTypes()

  },
  updated(){
    // console.log(this.pet_types_array)

    if (!this.isGetPetUpdated){
      this.selectedOption = this.pet_types_array[0].type
      this.isGetPetUpdated = true
    }

  },
  data() {
    return {
      isGetPetUpdated: false,


      selectedOption: '',
      pet_types_array: '',


      pet_name: '',
      pet_breed: '',
      pet_birthdate: '',
      pet_type: ''
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async createPet() {
      const url = process.env.VUE_APP_API_URL;

      const id = localStorage.getItem('user_id')
      const bearer = localStorage.getItem('bearer_token')
      const selectedPet = this.pet_types_array.find(pet => pet.type === this.selectedOption)


      try {
        /*
        * api/user/create_pet
        * 'pet_type_id',
        'user_id',
        'name',
        'breed',
        'birthdate',
        *
        * */

        const response = await axios.post(`${url}/api/user/create_pet`, {
          user_id: id,
          name: this.pet_name,
          breed: this.pet_breed,
          birthdate: this.pet_birthdate,
          pet_type_id: selectedPet.id,
        },{
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        });
        response.data
        this.$router.push('/dashboard/pets')
      } catch (err) {
        this.error = err;
        console.log('API request Failed', err)
      }
    }
  }
}
</script>

<style scoped>

</style>