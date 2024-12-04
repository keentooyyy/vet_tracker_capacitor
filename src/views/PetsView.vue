<template>
  <section>
    <h1 class="title">Your Pets</h1>
    <div class="pet-groups">
      <PetComponent v-for="pet in pets" :key="pet.id" :pet="pet"/>
    </div>
  </section>
</template>

<script>
import PetComponent from "@/components/PetComponent.vue";
import {petStore} from "@/stores/petStore";
import {watch} from "vue";

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
  async created() {

    this.getUserPets();


  },
  methods: {
    getUserPets() {
      const usePetStore = petStore()
      this.pets = usePetStore.getPets
      console.log(this.pets)
      watch(
          () => usePetStore.pets,
          (newPets) => {
            this.pets = newPets
          }
      )
    }
  },
};
</script>
<style scoped>
.title {

  margin-bottom: 2rem;
}

.pet-groups {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}
</style>
