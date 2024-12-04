<template>
  <section>
    <h1 class="title">Edit the Details of your Pet</h1>

    <div class="forms">
      <input v-model="pet_name" type="text" placeholder="Enter Your Pet Name" />
      <div class="form-grouped">

        <select v-model="selectedOption">
          <option v-for="pet_type in pet_types_array" :key="pet_type.id" :value="pet_type.type">{{ pet_type.type }}</option>
        </select>
        <input v-model="pet_birthdate " type="date" placeholder="Enter Your Pet Birthdate" />


      </div>
      <input v-model="pet_breed" type="text" placeholder="Enter Your Pet Breed" />
      <button class="button">Submit</button>
      <button @click="goBack" class="secondary-button">Back</button>
    </div>


  </section>
</template>

<script>
import axios from "axios";
import {petTypeStore} from "@/stores/petTypeStore";

export default {
  name: "EditPetView",
  created() {

    this.getPetDetails()


  },
  updated() {
    this.getPetTypes()
  },
  data(){
    return {
      selectedOption: '',
      pet_types_array: '',



      pet_name: '',
      pet_breed: '',
      pet_birthdate: '',
      pet_type: ''
    }
  },
  methods:{
    goBack(){
      this.$router.back()
    },
    async getPetDetails(){
      const url = process.env.VUE_APP_API_URL
      const bearer = localStorage.getItem('bearer_token')
      const pet_id = this.$route.params.id
      // console.log(pet_id)

      try {
        const response = await axios.get(`${url}/api/user/get_pet/${pet_id}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        })

        this.pet_name = response.data.current_pet.name
        this.pet_breed = response.data.current_pet.breed
        this.pet_birthdate = response.data.current_pet.birthdate
        this.pet_type = response.data.current_pet.id

        // console.log(response.data.current_pet)
      }catch (err){
        console.log('API Request Error', err)
      }
    },
    getPetTypes(){
      const usePetTypeStore = petTypeStore()
      this.pet_types_array = usePetTypeStore.getPetTypes
      console.log('pet type id ',this.pet_type)
      for (let i = 0; i < this.pet_types_array.length - 1; i++) {

        if (this.pet_type === this.pet_types_array[i].id){
          this.selectedOption = this.pet_types_array[i].type
        }
      }
      console.log('selected option',this.selectedOption)

    }
  }
}
</script>

<style scoped>
.title {
  margin-bottom: 2rem;
}

.forms {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}

.forms .form-grouped{
  display: flex;
  justify-content: space-between;
}
.forms .form-grouped select {
  width: 50%;
  background-color: white;
}

.forms .form-grouped input[type='date'] {
  width: 40%;
}

.forms input[type='text'], select, input[type='date'] {
  padding: 1rem;
  color: var(--main-color);
  font-size: 1.2rem;
  outline: solid 2px var(--secondary-color);
  border-radius: .5rem;
  border: none;
}

.forms .button {
  border: none;
  background-color: var(--main-color);
  color: white;
  font-size: 1.2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.forms .secondary-button{
  border: none;
  background-color: transparent;
  color: var(--main-color);
  font-size: 1.2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  outline: solid 1px var(--main-color);
}







.forms input:focus {
  outline-color: var(--main-color);
}
</style>