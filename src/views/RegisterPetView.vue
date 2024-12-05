<template>
  <section>
    <h1 class="title">Register a Pet</h1>

    <div class="forms">
      <input v-model="pet_name" placeholder="Enter Your Pet Name" type="text"/>
      <div class="form-grouped">

        <select v-model="selectedOption">
          <option v-for="pet_type in pet_types_array" :key="pet_type.id" :value="pet_type.type">{{
              pet_type.type
            }}
          </option>
        </select>
        <input v-model="pet_birthdate " placeholder="Enter Your Pet Birthdate" type="date"/>


      </div>
      <input v-model="pet_breed" placeholder="Enter Your Pet Breed" type="text"/>
      <button class="button" @click="createPet">Submit</button>
      <button class="secondary-button" @click="goBack">Back</button>
    </div>


  </section>
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
    async getPetTypes() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token')

      try{
        const response = await axios.get(`${url}/api/get_pet_type`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        })
        this.pet_types_array = response.data.types

      }catch (err){
        console.log('API Request Error', err)
      }
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
.title {
  margin-bottom: 2rem;
}

.forms {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}

.forms .form-grouped {
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

.forms .secondary-button {
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