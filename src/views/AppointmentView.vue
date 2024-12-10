<template>
  <div v-for="appointment in appointments" :key="appointment.id" class="text-black">
    <div v-if="appointment.user && appointment.pet">
      <h3 class="text-xl font-bold">
        Appointment for {{ appointment.user.fullName }}'s Pet: {{ appointment.pet.name }}
      </h3>
      <p><strong>Purpose:</strong> {{ appointment.purpose }}</p>
      <p><strong>Status:</strong> {{ appointment.appointment_status }}</p>
      <p><strong>Start Time:</strong> {{ appointment.start_time }}</p>
      <p v-if="appointment.end_time"><strong>End Time:</strong> {{ appointment.end_time }}</p>
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
          appointment.user = {
            fullName: `${user.first_name}`,
            email: user.email
          };
          appointment.pet = {
            name: pet.name,
            breed: pet.breed
          };
        } else {
          console.log(`No matching user or pet found for appointment ID: ${appointment.id}`);
        }

        return appointment;
      });
    }

  }
};
</script>

<style scoped>

</style>
