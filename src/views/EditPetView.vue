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
      <button @click="editPet" class="button">Submit</button>
      <button @click="goBack" class="secondary-button">Back</button>
    </div>


  </section>
</template>

<script>
import axios from "axios";


export default {
  name: "EditPetView",
  props: {
  },
  created() {
    this.getPetTypes()
    this.getPetDetails()




  },
  updated() {
    // this.getPetTypes()
    if (!this.isGetPetUpdated){
      this.selectedOption = this.pet_types_array[0].type
      this.isGetPetUpdated = true
    }

  },
  data(){
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
  methods:{
    goBack(){
      this.$router.back()
    },
    async getPetDetails(){
      const url = process.env.VUE_APP_API_URL
      const bearer = localStorage.getItem('bearer_token')
      const pet_id = this.$route.params.id

      try {
        const response = await axios.get(`${url}/api/user/get_pet/${pet_id}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        })

        this.pet_name = response.data.current_pet.name
        this.pet_breed = response.data.current_pet.breed
        this.pet_birthdate = response.data.current_pet.birthdate
        this.pet_type = response.data.current_pet.pet_type_id


      }catch (err){
        console.log('API Request Error', err)
      }
    },
     async getPetTypes(){

        const url = process.env.VUE_APP_API_URL;
        const bearer = localStorage.getItem('bearer_token')

        try{
          const response = await axios.get(`${url}/api/get_pet_type`, {
            headers: {
              'Authorization': `Bearer ${bearer}`,
            }
          })

          this.pet_types_array = response.data.types
          // console.log(this.pet_types_array)

        }catch (err){
          console.log('API Request Error', err)
        }
      },
    async editPet(){
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token')
      const pet_id = this.$route.params.id
      const user_id = localStorage.getItem('user_id')


      const selectedPet = this.pet_types_array.find(pet => pet.type === this.selectedOption)


      try {
        const response = await axios.patch(`${url}/api/user/${user_id}/edit_pet/${pet_id}`, {
          pet_type_id: selectedPet.id,
          user_id: user_id,
          name: this.pet_name,
          breed: this.pet_breed,
          birthdate: this.pet_birthdate
        },{
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        })
        console.log(response.data)
        this.$router.push('/dashboard/pets')
      }catch (err){
        console.log('API Request Error', err)
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

.forms .form-grouped{
  display: flex;
  justify-content: space-between;
}
.forms .form-grouped select {
  width: 45%;
  background-color: white;
}

.forms .form-grouped input[type='date'] {
  width: 50%;
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