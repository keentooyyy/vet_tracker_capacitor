<template>
  <div v-if="isMobile">
    <h1 class="text-2xl font-bold my-5">Create an Appointment</h1>

    <!-- Check if pets array is empty -->
    <div v-if="!pets || pets.length === 0">
      <p class="text-xl text-center">No pet registered</p>
    </div>
    <div v-else>
      <!-- Form for creating appointment if pets are available -->
      <div class="flex flex-col gap-y-4">
        <!-- Date and Time Input -->
        <div class="flex gap-x-3">
          <input v-model="date" class="w-3/6 p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md" type="date"/>

          <!-- Custom Time picker for hours only -->
          <div class="w-3/6">
            <select v-model="time" class="w-full p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md">
              <!-- Hours options from 8 AM to 5 PM with AM/PM format -->
              <option v-for="(hour, index) in hours" :key="index" :value="hour.value">{{ hour.label }}</option>
            </select>
          </div>
        </div>

        <!-- Pet Selection -->
        <select v-model="selectedOption"
                class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md">
          <option v-for="pet in pets" :key="pet.id" :value="pet.name">{{ pet.name }}</option>
        </select>

        <!-- Purpose Input -->
        <input
            v-model="purpose"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
            placeholder="Enter Purpose" type="text" />

        <!-- Submit and Back Buttons -->
        <button class="bg-[var(--main-color)] py-3 rounded-md text-white text-xl cursor-pointer" @click="setAppointment">Submit</button>
        <button class="text-[var(--main-color)] text-xl outline outline-2 outline-[var(--main-color)] py-3 rounded-md cursor-pointer"
                @click="goBack">
          Back
        </button>
      </div>
    </div>
  </div>

  <div v-if="!isMobile" class="w-11/12 mx-auto">
    <h1 class="text-2xl font-bold my-5">Create an Appointment</h1>

    <!-- Check if pets array is empty -->
    <div v-if="!pets || pets.length === 0">
      <p class="text-xl text-center">No pet registered</p>
    </div>
    <div v-else>
      <!-- Form for creating appointment if pets are available -->
      <div class="flex flex-col gap-y-4">
        <!-- Date and Time Input -->
        <div class="flex gap-x-3">
          <input v-model="date" class="w-3/6 p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md" type="date"/>

          <!-- Custom Time picker for hours only -->
          <div class="w-3/6">
            <select v-model="time" class="w-full p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md">
              <!-- Hours options from 8 AM to 5 PM with AM/PM format -->
              <option v-for="(hour, index) in hours" :key="index" :value="hour.value">{{ hour.label }}</option>
            </select>
          </div>
        </div>

        <!-- Pet Selection -->
        <select v-model="selectedOption"
                class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md">
          <option v-for="pet in pets" :key="pet.id" :value="pet.name">{{ pet.name }}</option>
        </select>

        <!-- Purpose Input -->
        <input
            v-model="purpose"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
            placeholder="Enter Purpose" type="text"/>

        <!-- Submit and Back Buttons -->
        <div class="flex justify-center gap-12">
          <button class="bg-[var(--main-color)] py-3 rounded-md text-white text-xl cursor-pointer w-full" @click="setAppointment">Submit</button>
          <button class="text-[var(--main-color)] text-xl outline outline-2 outline-[var(--main-color)] py-3 rounded-md cursor-pointer w-full"
                  @click="goBack">
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { updateLayout } from "@/helpers/layoutHelper";

export default {
  name: "CreateAppointmentView",
  data() {
    return {
      isMobile: updateLayout(),
      pets: [], // Default to empty array instead of null
      selectedOption: "",
      purpose: '',
      date: '',
      time: '08', // Default time to 8 AM
      selectedPetId: '',
      hours: [] // We'll fill this dynamically
    };
  },
  created() {
    this.getUserPets();
    this.generateHours();
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async getUserPets() {
      const user_id = localStorage.getItem('user_id');
      this.pets = JSON.parse(localStorage.getItem(`pets_${user_id}`)) || []; // Fallback to empty array if pets are not found
    },
    generateHours() {
      // Generate hours from 8 AM to 5 PM with AM/PM formatting
      this.hours = [];
      for (let hour = 8; hour <= 17; hour++) {
        const label = this.formatHour(hour);
        this.hours.push({ value: `${hour}`, label });
      }
    },
    formatHour(hour) {
      if (hour === 12) {
        return "12 PM";
      } else if (hour > 12) {
        return `${hour - 12} PM`;
      } else {
        return `${hour} AM`;
      }
    },
    async setAppointment() {
      // Combine the date and time to create the full appointment datetime.
      const appointmentDateTime = `${this.date} ${this.time}:00`; // Hour with '00' minutes
      console.log('Appointment Date and Time:', appointmentDateTime);

      // Find the selected pet ID
      const selectedPet = this.pets.find(pet => pet.name === this.selectedOption);
      if (selectedPet) {
        this.selectedPetId = selectedPet.id;
      }

      // API request to create the appointment
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');
      const userId = localStorage.getItem('user_id');

      try {
        const response = await axios.post(`${url}/api/user/create_appointment/${userId}`, {
          pet_id: this.selectedPetId,
          start_time: appointmentDateTime,
          purpose: this.purpose,
          user_id: userId
        }, {
          headers: {
            'Authorization': `Bearer ${bearer}`
          }
        });

        if (response.data.appointment) {
          this.$router.push('/dashboard/pets');
        }
      } catch (err) {
        console.error('API request failed', err);
      }
    }
  }
};
</script>

<style scoped>
/* Custom styles for time picker */
</style>
