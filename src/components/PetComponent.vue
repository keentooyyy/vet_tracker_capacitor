<template>
  <div class="bg-white rounded-md p-5 flex gap-x-5">
    <img class="w-1/4" src="/images/svgs/pet-icon.svg" alt="Pet Icon">
    <div>
      <h1 class="font-bold text-2xl uppercase">{{ pet.name }}</h1>
      <p class="opacity-50 text-md uppercase">{{pet.breed}}</p> <!-- Display breed -->
      <p class="opacity-50">Appointments:</p>
      <p class="date">{{ formattedAppointmentDate }}</p> <!-- Display birthdate or other details -->
      <div class="buttons-group">
        <button @click='editButton' class="edit">Edit Details</button>
        <button class="records">View Records</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PetComponent",
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  data(){
    return {
      pet_types_array: '',
      pet_type: ''
    }
  },
  beforeMount() {

  },
  updated() {


  },
  methods: {
    editButton(){
      this.$router.push(`pets/${this.pet.id}`)
    },

  },
  computed: {
    formattedAppointmentDate() {
      if (this.pet.appointments.length > 0) {
        const appointmentDate = new Date(this.pet.appointments[0].start_time);
        return new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }).format(appointmentDate);
      }
      return "";
    },
  },


};
</script>

<style scoped>

</style>
