<template>

  <h1 class="text-2xl font-bold my-5 text-center">Appointments for Today</h1>
  <div v-for="appointment in appointments" :key="appointment.id" class="bg-white rounded-md w-11/12 mx-auto p-5 text-black">
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
        <span class="bg-[var(--main-color)] px-5 text-white uppercase">{{ appointment.start_time }}</span>
      </div>

      <p v-if="appointment.end_time"><strong>End Time:</strong> {{ appointment.end_time }}</p>
      <div class="flex mt-3 justify-end gap-5 w-full uppercase">


        <button class="bg-[var(--main-color)] text-white px-4 rounded-full text-md cursor-pointer"
        >Complete
        </button>

        <button class="bg-red-800 px-4 rounded-full text-white text-md cursor-pointer"
        >Cancel
        </button>



      </div>

    </div>
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
    this.getAppointmentandUsers();// Retrieve users information (no need for separate pets)
  },
  methods: {
    getAppointmentandUsers() {
      this.users = JSON.parse(localStorage.getItem("user_accounts"));
      this.appointments = JSON.parse(localStorage.getItem("appointments"));
      this.matchUsersAndPets();
    },
    matchUsersAndPets() {
      this.appointments = this.appointments.map(appointment => {
        const user = this.users.find(user => user.id === appointment.user_id);
        const pet = user ? user.pets.find(pet => pet.id === appointment.pet_id) : null;

        if (user && pet) {
          return {
            ...appointment,
            user: {
              fullName: `${user.first_name}`,
              email: user.email
            },
            pet: {
              name: pet.name,
              breed: pet.breed
            }
          };
        } else {
          console.log(`No matching user or pet found for appointment ID: ${appointment.id}`);
          return appointment;
        }
      });

      // Reassign the array to force Vue's reactivity system to detect changes
      this.appointments = [...this.appointments];
    },
    async cancelAppointment(){

    }
  }
}
</script>

<style scoped>

</style>
