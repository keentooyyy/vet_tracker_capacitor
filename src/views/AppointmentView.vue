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
          <span class="font-bold">Date and Time: </span>
          <span class="bg-[var(--main-color)] px-5 text-white uppercase">
            {{ formatDate(appointment.date) }}, {{ formatTime(appointment.start_time) }}
          </span>
        </div>

        <p v-if="appointment.end_time">
          <strong>End Time:</strong> {{ formatTime(appointment.end_time) }}
        </p>

        <div class="flex mt-3 justify-end gap-5 w-full uppercase">
          <button
              class="bg-[var(--main-color)] text-white px-4 rounded-full text-md cursor-pointer"
          >
            Complete
          </button>

          <button
              class="bg-red-800 px-4 rounded-full text-white text-md cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Show this message if appointments are empty or null -->
  <div v-else class="text-center text-gray-500 text-lg font-semibold">
    Empty appointments
  </div>
</template>

<script>
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
      try {
        // Fetch data from API or use localStorage as fallback
        const usersData = localStorage.getItem("user_accounts");
        const appointmentsData = localStorage.getItem("appointments");

        // Parse fetched data
        this.users = JSON.parse(usersData);
        this.appointments = JSON.parse(appointmentsData);

        // Process and update the UI
        this.matchUsersAndPets();
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    },

    matchUsersAndPets() {
      // Ensure appointments array is valid before mapping
      if (!Array.isArray(this.appointments)) {
        this.appointments = [];
      }

      // Match users and pets
      const updatedAppointments = this.appointments.map((appointment) => {
        const user = this.users.find((user) => user.id === appointment.user_id);
        const pet = user ? user.pets.find((pet) => pet.id === appointment.pet_id) : null;

        if (user && pet) {
          return {
            ...appointment,
            user: {
              fullName: `${user.first_name} ${user.last_name}`,
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
      this.appointments = [...updatedAppointments];
    },

    // Method to format 24-hour time to 12-hour format with AM/PM
    formatTime(timeString) {
      const [hours, minutes] = timeString.split(':').map(Number);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12; // Convert hour to 12-hour format
      const minuteFormatted = minutes < 10 ? `0${minutes}` : minutes;

      return `${hour12}:${minuteFormatted} ${ampm}`;
    },

    // Method to format the date to "Dec, 12"
    formatDate(dateString) {
      const date = new Date(dateString); // Assuming the dateString is a valid date format
      const options = {month: 'short', day: 'numeric'};
      return date.toLocaleDateString('en-US', options); // Formats like "Dec, 12"
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
