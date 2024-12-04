<template>
  <section>
    <h1 class="title">Edit the Details of your Pet</h1>

    <div class="forms">
      <input type="text" placeholder="Enter Your Pet Name" />
      <div class="form-grouped">

        <select v-model="selectedOption">
          <option v-for="pet_type in pet_types" :key="pet_type.id" :value="pet_type.type">{{ pet_type.type }}</option>
        </select>


        <input type="date" placeholder="Enter Your Pet Birthdate" />
      </div>
      <input type="text" placeholder="Enter Your Pet Breed" />
    </div>


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
.title {
  margin-bottom: 2rem;
}

.forms {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.forms .form-grouped{
  display: flex;
  outline: solid 1px red;
  justify-content: space-between;
}
.forms .form-grouped select {
  width: 16rem;
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









.forms input:focus {
  outline-color: var(--main-color);
}
</style>