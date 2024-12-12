<template>
  <h1 class="text-2xl font-bold my-5 text-center">Appointments for Today</h1>

  <div v-if="appointments && appointments.length > 0">
    <div
        v-for="appointment in appointments"
        :key="appointment.id"
        class="bg-white rounded-md w-11/12 mx-auto p-5 text-black mb-3"
    >
      <div v-if="appointment.user && appointment.pet">
        <h3 class="text-xl font-bold uppercase">
          Appointment for {{ appointment.user.fullName }}
        </h3>

        <div class="mt-3">
          <span class="font-bold">Pet: </span>
          <span class="uppercase">{{ appointment.pet.name }}</span>
        </div>

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
          <strong>End Time:</strong> {{ formatDate(appointment.end_time) }}
        </p>

        <div class="flex mt-3 justify-end gap-5 w-full uppercase">
          <button class="bg-[var(--main-color)] text-white px-4 rounded-full text-md cursor-pointer"
                  @click="completeAppointment(appointment.id)"
          >
            Complete
          </button>

          <button
              class="bg-red-800 px-4 rounded-full text-white text-md cursor-pointer" @click="cancelAppointment(appointment.id)"
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
  name: "AppointmentView",
  data() {
    return {
      appointments: [], // Store appointments
      users: [], // Store users (updated source)
    };
  },
  mounted() {
    this.getAppointmentandUsers();
  },
  methods: {
    getAppointmentandUsers() {
      // Retrieve and parse data from localStorage
      const usersData = localStorage.getItem("user_accounts");
      const appointmentsData = localStorage.getItem("appointments");

      // Handle null or invalid data
      this.users = usersData ? JSON.parse(usersData) : [];
      this.appointments = appointmentsData ? JSON.parse(appointmentsData) : [];

      // Process the appointments and match users/pets
      this.matchUsersAndPets();
    },
    matchUsersAndPets() {
      // Ensure appointments array is valid before mapping
      if (!Array.isArray(this.appointments)) {
        this.appointments = [];
      }

      this.appointments = this.appointments.map((appointment) => {
        const user = this.users.find((user) => user.id === appointment.user_id);
        const pet = user ? user.pets.find((pet) => pet.id === appointment.pet_id) : null;

        if (user && pet) {
          return {
            ...appointment,
            user: {
              fullName: `${user.first_name}`,
              email: user.email,
            },
            pet: {
              name: pet.name,
              breed: pet.breed,
            },
          };
        } else {
          console.log(`No matching user or pet found for appointment ID: ${appointment.id}`);
          return appointment;
        }
      });

      // Reassign to force Vue reactivity
      this.appointments = [...this.appointments];
    },
    // Method to format the start_time
    formatDate(startTime) {
      return dayjs(startTime).format('MMM D, h A'); // Format as Dec. 12, 10 AM
    },

    async completeAppointment(appointmentID){


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
        await axios.patch(`${url}/api/vets/update_appointment/${appointmentID}`, {
          appointment_status: 'completed'
        },{
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        });
        alert('Appointment completed')
        this.getAllAppointments()
        this.getAppointmentandUsers()

      } catch (err) {
        console.log('API error', err);
      }
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
        await axios.patch(`${url}/api/vets/update_appointment/${appointmentID}`, {
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


    async getAllAppointments() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');

      try {
        if (localStorage.getItem('account_type') === 'vets') {
          const response = await axios.get(`${url}/api/vets/show_all_appointments`, {
            headers: {'Authorization': `Bearer ${bearer}`},
          });

          this.appointments = response.data.appointments;
        } else {
          const user_id = localStorage.getItem('user_id');
          const response = await axios.get(`${url}/api/user/show_user_appointments/${user_id}`, {
            headers: {'Authorization': `Bearer ${bearer}`},
          });

          this.appointments = response.data.appointments;
        }

        localStorage.setItem('appointments', JSON.stringify(this.appointments));
      } catch (err) {
        console.log('API Request Error', err);
      }
    },
  },
}
</script>

<style scoped>
/* Add custom styles for the appointment view */
</style>
