<template>
  <div>
    <h1 class="text-2xl font-bold my-5">Create an Appointment</h1>

    <div class="flex flex-col gap-y-4">

      <div class="flex gap-x-3">
        <input v-model="date" class="w-3/6 p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md" type="date"/>
        <input class="w-3/6 p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md" type="time" v-model="time"
               :min="minTime"
               :max="maxTime"
               step="3600"/>
      </div>

      <select v-model="selectedOption"
              class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md ">
        <option v-for="pet in pets" :key="pet.id" :value="pet.name">{{ pet.name }}</option>
      </select>

<!--      {{ selectedPetId }}-->


      <input
          v-model="purpose"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
          placeholder="Enter Purpose" type="text"/>
      <button class="bg-[var(--main-color)] py-3 rounded-md text-white text-xl cursor-pointer" @click="setAppointment">Submit</button>
      <button class="text-[var(--main-color)] text-xl outline outline-2 outline-[var(--main-color)] py-3 rounded-md cursor-pointer"
              @click="goBack">
        Back
      </button>
    </div>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateAppointmentView",
  data() {
    return {
      isPetAlreadyUpdated: false,
      // hasNoPets: false,

      pets: [],
      selectedOption: "",

      purpose: '',

      date: '',
      time: '',
      minTime: '08:00',
      maxTime: '17:00',

      selectedPetId:''
    }
  },
  updated() {
    if (!this.isPetAlreadyUpdated) {
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
    // console.log(this.selectedOption)

    // console.log(this.selectedPetId)


  },
  created() {
    this.getUserPets();
  },

  methods: {
    goBack() {
      this.$router.back()
    },
    async getUserPets() {
      const user_id = localStorage.getItem('user_id');
      this.pets = JSON.parse(localStorage.getItem(`pets_${user_id}`))
    },
    async setAppointment(){

      /* api/user/create_appointment/{user_id}
      *
      *     'pet_id' => 'required|exists:pets,id',
            'start_time' => 'required|date|after_or_equal:' . Carbon::today()->setHour(8)->setMinute(0)->toDateTimeString(),
            'end_time' => 'nullable|date|after:start_time',
            'purpose' => 'required|string',
      *
      *
      * */


      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');
      const id = localStorage.getItem('user_id');

      for (let i = 0; i < this.pets.length; i++) {
        // console.log(this.pets[i].name)
        if (this.selectedOption === this.pets[i].name) {
          this.selectedPetId = this.pets[i].id
        }
      }

      const startTime = `${this.date} ${this.time}`;

      // const selectedPetId = this.pets.find(pet => pet.type === this.selectedOption)

      try {
        const response = await axios.post(`${url}/api/user/create_appointment/${id}`, {
          pet_id: this.selectedPetId,
          start_time: startTime,
          purpose: this.purpose,
          user_id: id

        }, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });
        if (response.data.appointment){
          this.$router.push('/dashboard/pets')
        }


      } catch (err) {
        console.log('API request Failed', err);
      }
    }
  }
}
</script>


<style scoped>

</style>