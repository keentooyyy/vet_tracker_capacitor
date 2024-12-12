<template>
  <h1 class="text-2xl font-bold my-5 text-center">Your Appointments</h1>

  <div v-if="appointments && appointments.length > 0">
    <div
        v-for="appointment in appointments"
        :key="appointment.id"
        class="bg-white rounded-md w-11/12 mx-auto p-5 text-black mb-3"
    >
      <div v-if="appointment.user && appointment.pet">
        <h3 class="text-xl font-bold uppercase">
          Appointment for {{ appointment.pet.name }}
        </h3>
        <div>
          <span class="font-bold">Purpose: </span>
          <span class="uppercase">{{ appointment.purpose }}</span>
        </div>

        <div>
          <span class="font-bold">Start Time: </span>
          <span class="bg-[var(--main-color)] px-5 text-white ">
            {{ formatDate(appointment.start_time) }}
          </span>
        </div>

        <p v-if="appointment.end_time">
          <strong>End Time:</strong> {{ formatDate(appointment.end_time)  }}
        </p>

        <div class="flex mt-3 justify-end gap-5 w-full uppercase">
          <button @click="cancelAppointment(appointment.id)"
              class="bg-red-800 px-4 rounded-full text-white text-md cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Show this message if appointments are empty or null -->
  <div
      v-else
      class="text-center text-gray-500 text-lg font-semibold"
  >
    Empty appointments
  </div>
</template>

<script>
import dayjs from 'dayjs';
import axios from "axios"; // Import dayjs

export default {
  name: "AppointmentViewUser",
  data() {
    return {
      appointments: [], // Store appointments
      user: {}, // Store current user data
      pets: [], // Store pets for the current user
    };
  },
  mounted() {
    this.getAppointmentsAndPets();
  },
  methods: {
    // Function to retrieve appointments and pets for the current user
    getAppointmentsAndPets() {
      // Get the user_id from localStorage
      const userId = localStorage.getItem("user_id");

      // Retrieve user data (can be dynamic if account_type is 'users')
      const userData = localStorage.getItem("user"); // Assuming this is the user data
      this.user = userData ? JSON.parse(userData) : null;

      // Get the pets for the user based on the dynamic pets key (e.g. pets_2)
      const petsData = localStorage.getItem(`pets_${userId}`);
      this.pets = petsData ? JSON.parse(petsData) : [];

      // Retrieve and parse the appointments data from localStorage
      const appointmentsData = localStorage.getItem("appointments");
      this.appointments = appointmentsData ? JSON.parse(appointmentsData) : [];

      // Process the appointments and match users/pets
      this.matchUsersAndPets();
    },

    matchUsersAndPets() {
      // Ensure appointments array is valid before mapping
      if (!Array.isArray(this.appointments)) {
        this.appointments = [];
      }

      // Map over appointments and match users with pets
      this.appointments = this.appointments.map((appointment) => {
        // Match user by user_id
        if (this.user && appointment.user_id === this.user.id) {
          // Find the pet for this appointment using the pet_id
          const pet = this.pets.find((pet) => pet.id === appointment.pet_id);

          // If the pet exists, return the appointment with user and pet info
          if (pet) {
            return {
              ...appointment,
              user: {
                fullName: `${this.user.first_name} ${this.user.last_name}`,
                email: this.user.email,
              },
              pet: {
                name: pet.name,
                breed: pet.breed,
              },
            };
          } else {
            console.log(`No matching pet found for appointment ID: ${appointment.id}`);
            return appointment;
          }
        } else {
          return appointment;
        }
      });

      // Reassign to force Vue reactivity
      this.appointments = [...this.appointments];
    },

    async cancelAppointment(appointmentID){

      /*
      * api/vets/update_appointment/{appointmentId}
      *
      *
      *
      *
      * */

      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');

      try {
        await axios.patch(`${url}/api/user/update_appointment/${appointmentID}`, {
          appointment_status: 'canceled'
        },{
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        });

        alert('Appointment canceled')
        this.getAllAppointments()
      } catch (err) {
        console.log('API error', err);
      }
    },

    // Method to format the start_time
    formatDate(startTime) {
      return dayjs(startTime).format('MMM D, h A'); // Format as Dec. 12, 10 AM
    },
  },
};
</script>

<style scoped>
/* Add custom styles for the appointment view */
</style>
