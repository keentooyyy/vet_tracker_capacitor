<template>
  <section>
    <img src="/images/svgs/pet-icon.svg" alt="Pet Icon" class="img-fluid">
    <div class="details">

      <h1>{{ pet.name }}</h1>
      <p>Breed: {{pet.breed}}</p> <!-- Display breed -->
      <p class="appointments">Appointments:</p>
      <p class="date">{{ formattedAppointmentDate }}</p> <!-- Display birthdate or other details -->

      <div class="buttons-group">
        <button @click='editButton' class="edit">Edit Details</button>
        <button class="records">View Records</button>
      </div>
    </div>
  </section>
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
   /* async getPetTypes(){

      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token')

      try{
        const response = await axios.get(`${url}/api/get_pet_type`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        })

        this.pet_types_array = response.data.types
        // console.log(this.pet_types_array)

      }catch (err){
        console.log('API Request Error', err)
      }
    },*/
  },
  computed: {
    // Format the first appointment's start_time or return an empty string
    formattedAppointmentDate() {
      if (this.pet.appointments.length > 0) {
        const appointmentDate = new Date(this.pet.appointments[0].start_time);
        return new Intl.DateTimeFormat("en-US", {
          month: "short", // Abbreviated month name
          day: "2-digit", // Two-digit day
          year: "numeric", // Full year
        }).format(appointmentDate);
      }
      return "";
    },
  },


};
</script>

<style scoped>

</style>
