<template>
  <section>
    <h1 class="title">Create an Appointment</h1>

    <div class="forms">

      <div class="form-grouped">
        <input type="date"/>
        <input type="time"/>
      </div>

      <select v-model="selectedOption">
        <option v-for="pet in pets" :key="pet.id" :value="pet.name">{{ pet.name }}</option>
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

      pets: [],
      selectedOption: "",
    }
  },
  updated() {
    if(!this.isPetAlreadyUpdated){
      this.selectedOption = this.pets[0].name
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

        this.pets = response.data.pets; // Save the pets data in the `pets` array
      } catch (err) {
        console.log('API request Failed', err);
      }
    },
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


.forms input[type='text'], select, input[type='date'], input[type='time'] {
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