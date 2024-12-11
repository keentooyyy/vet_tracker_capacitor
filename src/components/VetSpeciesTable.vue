<template>
  <div class="flex mt-10 w-full gap-10">
    <h1 class="text-2xl font-bold"> Registered Species</h1>

    <button
        class="bg-[var(--main-color)] px-3 rounded-md text-white text-sm cursor-pointer"
        @click="openModal"
    >
      Add New Species
    </button>
  </div>

  <div class="overflow-x-auto">
    <!-- Conditionally display the table or a message -->
    <div v-if="pet_types.length === 0" class="text-center py-5">
      <p class="text-lg text-gray-500">Species is currently empty</p>
    </div>
    <table v-else class="mt-5">
      <thead>
      <tr>
        <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">
          Treatment Type
        </td>
        <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">
          Action
        </td>
      </tr>
      </thead>
      <tbody>
      <!-- Loop through vaccineTypes and populate the table -->
      <tr v-for="pet_type in pet_types" :key="pet_type.id" class="text-center">
        <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ pet_type.type }}</td>
        <td class="text-center uppercase px-2 border border-[var(--main-color)]">
          <button
              class="bg-red-800 py-3 px-2 rounded-md text-white text-sm cursor-pointer w-full"
              @click="deleteVaccine(pet_type.id)"
          >
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Reusable Modal -->
  <ReusableModal
      :isOpen="isModalOpen"
      placeholder="Enter Species Name"
      @close="closeModal"
      @submit="createSpecies"
  />
</template>

<script>
import axios from "axios";
import ReusableModal from "@/components/ReusableModal.vue"; // Adjust path as needed

export default {
  name: "VetSpeciesTable",
  components: {
    ReusableModal,
  },
  data() {
    return {
      isModalOpen: false, // Tracks modal visibility
      modalInputValue: "", // Input value for the vaccine name
      pet_types: [], // Initial vaccine types data
    };
  },
  mounted() {

    const petTypefromStorage = localStorage.getItem('pet_types');
    this.pet_types = petTypefromStorage ? JSON.parse(petTypefromStorage) : [];
    this.$nextTick(() => {
      // You can add any additional logic here if necessary
    });

  },
  methods: {
    // Opens the modal when the "Add New Vaccine" button is clicked
    openModal() {
      this.isModalOpen = true;
    },

    // Closes the modal when the user clicks cancel or submits the form
    closeModal() {
      this.isModalOpen = false;
    },
    async createSpecies(speciesName){
      const url = process.env.VUE_APP_API_URL
      const bearer = localStorage.getItem('bearer_token')

      try{

        /*
        *  api/vets/create_species
        *
        * */
        const response = await axios.post(`${url}/api/vets/create_species`, {
          type: speciesName,
        }, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        })
        console.log(response)
        const currentPetTypes = JSON.parse(localStorage.getItem('pet_types')) || [];
        currentPetTypes.push(response.data.type);


        localStorage.setItem('pet_types', JSON.stringify(currentPetTypes));


        this.pet_types = currentPetTypes;

      }catch (err) {
        console.log("API Request Error", err);
        alert("Failed to add Species.");
      }
    }


  },
};
</script>

<style scoped>
/* Add any styles if needed */
</style>
