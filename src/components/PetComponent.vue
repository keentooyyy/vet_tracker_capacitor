<template>
  <section>
    <img src="/images/svgs/pet-icon.svg" alt="Pet Icon" class="img-fluid">
    <div class="details">

      <h1>{{ pet.name }}</h1>
      <p>{{ pet.breed }}</p> <!-- Display breed -->
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

    }
  },
  created() {
  },
  methods: {
    editButton(){
      this.$router.push(`pets/${this.pet.id}`)
    }
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
section {
  background: white;
  display: flex;
  column-gap: 2rem;
  border-radius: .55rem;
  padding: 1.5rem;
  align-items: center;
}

.img-fluid {
  width: 30%;
  height: 30%;
}

section .details {
  width: 100%;
}

section .details h1 {
  font-size: 2rem;
}

section .details p {
  font-size: 1.5rem;
  opacity: .5;
}

section .details .appointments {
  margin-top: .8rem;
  font-size: 1rem;
}

section .details .date {
  text-align: center;
  width: 80%;
  opacity: 1;
  color: white;
  font-weight: bold;
  padding-left: 1em;
  padding-right: 1em;
  font-size: 1.2rem;
  margin-top: .5em;
  background-color: var(--main-color);
}

section .details .buttons-group {
  display: flex;
  width: 100%;
  justify-content: end;
  column-gap: 1rem;
}

section .details button {
  all: unset;
  place-self: end;
  background: none;
  margin-top: 1.5rem;
  font-size: .75rem;
  padding: .5rem .7rem;
}

section .details .edit {
  color: var(--main-color);
  border-radius: 500px;
  outline: solid 2px var(--main-color);
  cursor: pointer;
}

section .details .records {
  border-radius: 500px;
  background-color: var(--main-color);
  color: white;
  cursor: pointer;
}
</style>
