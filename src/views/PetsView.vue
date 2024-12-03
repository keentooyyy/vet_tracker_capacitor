<template>
  <section>
    <h1 class="title">Your Pets</h1>

    <div class="pet-groups">
      <PetComponent v-for="pet in pets" :key="pet.id" :pet="pet"/>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import PetComponent from "@/components/PetComponent.vue";

export default {
  name: "PetsView",
  components: {
    PetComponent,
  },
  data() {
    return {
      pets: [],
    };
  },
  beforeMount() {
    this.getUserPets();
  },
  methods: {
    async getUserPets() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');
      const id = localStorage.getItem('user_id');
      try {
        const response = await axios.get(`${url}/api/user/${id}/pets`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });
        this.pets = response.data.pets; // Save the pets data in the `pets` array
      } catch (err) {
        console.log('API request Failed', err);
      }
    }
  }
};
</script>
<style scoped>
.title {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.pet-groups {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}
</style>
