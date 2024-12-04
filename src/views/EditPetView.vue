<template>
  <section>
    <h1 class="title">Edit the Details of your Pet</h1>

    <div class="forms">
      <input v-model="pet_name" type="text" placeholder="Enter Your Pet Name" />
      <div class="form-grouped">

        <select v-model="selectedOption">
          <option v-for="pet_type in pet_types" :key="pet_type.id" :value="pet_type.type">{{ pet_type.type }}</option>
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

export default {
  name: "EditPetView",
  mounted() {
    this.getPetTypes()
    this.getPetDetails()
  },
  data(){
    return {
      selectedOption: '',
      pet_types: '',
      pet_name: '',
      pet_breed: '',
      pet_birthdate: ''
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
        // if (this.pet_types.length > 0){
        //   this.selectedOption = this.pet_types[0].type;
        // }

      }catch (err){
        console.log('API Request Error', err)
      }
    },
    goBack(){
      this.$router.back()
    },
    async getPetDetails(){
      const url = process.env.VUE_APP_API_URL
      const bearer = localStorage.getItem('bearer_token')
      const pet_id = this.$route.params.id
      console.log(pet_id)

      try {
        const response = await axios.get(`${url}/api/user/get_pet/${pet_id}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        })

        this.pet_name = response.data.current_pet.name
        this.pet_breed = response.data.current_pet.breed
        for (let i = 0; i < this.pet_types.length - 1; i++) {
          if (response.data.current_pet.pet_type_id === this.pet_types[i].id){
            this.selectedOption = this.pet_types[i].type
          }
        }
        this.pet_birthdate = response.data.current_pet.birthdate

        console.log(response.data.current_pet)
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
  width: 16rem;
  background-color: white;
}

.forms .form-grouped input[type='date'] {
  width: 12rem;
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