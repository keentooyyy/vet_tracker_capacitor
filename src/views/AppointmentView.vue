<template>
  <section>
    <h1>Create an Appointment</h1>

    <div>

      <div>
        <input type="date"/>
        <input type="time"/>
      </div>

      <select v-model="selectedOption">
        <option v-for="pet in pets" :key="pet.id" :value="pet.name">{{ pet.name }}</option>
      </select>


<!--      <select v-if="hasNoPets" value="no_pets">-->
<!--        <option value="no_pets">No pets registered.</option>-->
<!--      </select>-->

      <input type="text" placeholder="Enter Purpose"/>
      <button>Submit</button>
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
      // hasNoPets: false,

      pets: [],
      selectedOption: "",
    }
  },
  updated() {
    if(!this.isPetAlreadyUpdated){
      this.selectedOption = this.pets[0].name
      this.isPetAlreadyUpdated = true;

      // if (this.pets.length > 0) {
      //   this.selectedOption = this.pets[0].name
      // }
      // else {
      //   this.hasNoPets = true;
      // }
      // this.isPetAlreadyUpdated = true;
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

        if (response.data.pets && response.data.pets.length > 0) {
          this.pets = response.data.pets;
          this.selectedOption = this.pets[0].name; // Set default option
        } else {
          this.pets = [];
          this.selectedOption = 'No Pets'; // Handle no pets scenario
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