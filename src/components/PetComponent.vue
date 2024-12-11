<template>
  <div class="bg-white rounded-md p-5 flex w-full flex-wrap relative" v-if="isMobile">
    <img alt="Pet Icon" class="w-1/4 mr-5 md:mr-10" src="/images/svgs/pet-icon.svg">
    <div>
      <h1 class="font-bold text-2xl uppercase">{{ pet.name }}</h1>
      <p class="opacity-50 text-md uppercase">{{ pet.breed }}</p> <!-- Display breed -->
      <p class="opacity-50 mt-3">Appointments:</p>
      <p class="bg-[var(--main-color)] text-white text-center w-full px-2">{{ formattedAppointmentDate }}</p>
      <!-- Display birthdate or other details -->
    </div>
    <div class="font-bold text-[var(--main-color)] absolute right-0 top-0 mt-3 mr-3 cursor-pointer" @click="deleteEmit">
      X
    </div>
    <div class="mt-5 flex justify-around w-full">
      <button
          class="outline outline-1 outline-[var(--main-color)] px-4 rounded-full text-xs md:text-xl text-[--main-color] py-1 cursor-pointer"
          @click='editButton'>Edit Details
      </button>
      <button class="bg-[var(--main-color)] text-white px-4 rounded-full text-xs md:text-xl cursor-pointer"
              @click="viewRecords">View Records
      </button>
    </div>

  </div>


  <div class="bg-white p-5 rounded-md relative flex gap-5 w-96" v-if="!isMobile">
    <img alt="Pet Icon" class="w-4/12" src="/images/svgs/pet-icon.svg">
    <div>
      <h1 class="font-bold uppercase">{{ pet.name }}</h1>
      <p class="opacity-50 uppercase">{{ pet.breed }}</p> <!-- Display breed -->
      <p class="opacity-50">Appointments:</p>
      <p class="bg-[var(--main-color)] px-4 text-white text-center">{{ formattedAppointmentDate }}</p>

      <div class="absolute top-0 right-0 pt-2 pr-7 font-bold w-0 h-0" @click="deleteEmit">
        X
      </div>
      <!-- Display birthdate or other details -->
      <div class="mt-3 flex gap-5">
        <button
            class="outline outline-1 outline-[var(--main-color)] px-2 rounded-full text-xs  text-[--main-color] py-1 cursor-pointer"
            @click='editButton'>Edit Details
        </button>
        <button class="bg-[var(--main-color)] text-white px-2 rounded-full text-xs cursor-pointer"
                @click="viewRecords">View Records
        </button>
      </div>
    </div>

  </div>
</template>

<script>

import {updateLayout} from "@/helpers/layoutHelper";

export default {
  name: "PetComponent",
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isMobile: updateLayout(),

      pet_types_array: '',
      pet_type: ''
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Clean up event listener
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeMount() {

  },
  updated() {


  },
  emits: ['deleteEmit'],
  methods: {
    editButton() {
      const current_id = this.$route.params.userId; // Extract the "1" (or other dynamic value) from the current route
      const pet_id = this.pet.id;
      // console.log(this.$route.params.userId);
      if (localStorage.getItem('account_type') === 'vets'){
        this.$router.push(`/dashboard/pets/${current_id}/edit/${pet_id}`)
      }
      else {
        this.$router.push(`/dashboard/pets/edit/${this.pet.id}`)
      }

    },
    deleteEmit() {
      this.$emit('deleteEmit', this.pet.id)
    },
    viewRecords() {
      const current_id = this.$route.params.userId; // Extract the "1" (or other dynamic value) from the current route
      const pet_id = this.pet.id;
      // console.log(this.$route.params)

      if (localStorage.getItem('account_type') === 'vets'){
        this.$router.push(`/dashboard/pets/${current_id}/pet_records/${pet_id}`)
      }
      else {

        /*
        * 'pets/:userId/pet_records/:id'
        *
        * */
        this.$router.push(`/dashboard/pet_records/${this.pet.id}`)
      }
    }


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
