<template>
  <section>
    <h1 class="title">Your Pets</h1>

    <input type="text" placeholder="Enter Your Pet Name" />
    <input type="text" placeholder="Enter Your Pet Breed" />
    <input type="date" placeholder="Enter Your Pet Birthdate" />
    <select v-model="selectedOption">
      <option v-for="pet_type in pet_types" :key="pet_type.id" :value="pet_type.type">{{ pet_type.type }}</option>
    </select>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "EditPetView",
  beforeMount() {
    this.getPetTypes()
  },
  data(){
    return {
      selectedOption: '',
      pet_types: ''
    }
  },
  methods:{
    async getPetTypes(){
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token')

      try{
        const response = await axios.get(`${url}/api/user/get_pet_types`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        })
        this.pet_types = response.data.types
        if (this.pet_types.length > 0){
          this.selectedOption = this.pet_types[0].type;
        }

      }catch (err){
        console.log('API Request Error', err)
      }
    }
  }
}
</script>

<style scoped>

</style>