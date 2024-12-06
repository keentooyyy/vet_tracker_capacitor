<template>
  <div class="bg-white rounded-md p-5 flex w-full flex-wrap">
    <img class="w-1/4 mr-5" src="/images/svgs/pet-icon.svg" alt="Pet Icon">
    <div>
      <h1 class="font-bold text-2xl uppercase">{{ pet.name }}</h1>
      <p class="opacity-50 text-md uppercase">{{pet.breed}}</p> <!-- Display breed -->
      <p class="opacity-50 mt-3">Appointments:</p>
      <p class="bg-[var(--main-color)] text-white text-center w-10/12">{{ formattedAppointmentDate }}</p>
      <!-- Display birthdate or other details -->
    </div>
    <div class="mt-5 flex justify-around w-full">
      <button class="outline outline-1 outline-[var(--main-color)] px-4 rounded-full text-xs text-[--main-color] py-1" @click='editButton'>Edit Details</button>
      <button class="bg-[var(--main-color)] text-white px-4 rounded-full text-xs">View Records</button>
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
