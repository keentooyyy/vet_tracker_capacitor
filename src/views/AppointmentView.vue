<template>
  <section>
    <h1 class="title">Create an Appointment</h1>

    <div class="forms">

      <div class="form-grouped">
        <input type="date"/>
        <input type="time"/>
      </div>

      <select v-model="selectedOption" v-if="!hasNoPets">
        <option v-for="pet in pets" :key="pet.id" :value="pet.name">{{ pet.name }}</option>
      </select>


      <select v-if="hasNoPets" value="no_pets">
        <option value="no_pets">No pets registered.</option>
      </select>

      <input type="text" placeholder="Enter Purpose"/>
      <button class="button">Submit</button>
      <button @click="goBack" class="secondary-button">Back</button>
    </div>


  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "AppointmentView",
  data() {
    return {
      isPetAlreadyUpdated: false,
      hasNoPets: false,

      pets: [],
      selectedOption: "",
    }
  },
  updated() {
    if(!this.isPetAlreadyUpdated){

      if (this.pets.length > 0) {
        this.selectedOption = this.pets[0].name
      }
      else {
        this.hasNoPets = true;
      }
      this.isPetAlreadyUpdated = true;
    }


  },
  created() {
    this.getUserPets();
  },

  methods: {
    goBack(){
      this.$router.back()
    },
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
        if (response.data.pets){
          this.selectedOption = 'No Pets'
        }
      } catch (err) {
        console.log('API request Failed', err);
      }
    },
  }
}
</script>


<style scoped>

</style>