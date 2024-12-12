<template>
  <div class="flex mt-10 w-full gap-10">
    <h1 class="text-2xl font-bold"> All kinds of Treatment</h1>

    <button
        class="bg-[var(--main-color)] px-3 rounded-md text-white text-sm cursor-pointer"
        @click="openModal"
    >
      Add New Treatment
    </button>
  </div>

  <div class="overflow-x-auto">
    <!-- Conditionally display the table or a message -->
    <div v-if="vaccineTypes.length === 0" class="text-center py-5">
      <p class="text-lg text-gray-500">Treatment is currently empty</p>
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
      <tr v-for="vaccine in vaccineTypes" :key="vaccine.id" class="text-center">
        <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ vaccine.name }}</td>
        <td class="text-center uppercase px-2 border border-[var(--main-color)]">
          <button
              class="bg-red-800 py-3 px-2 rounded-md text-white text-sm cursor-pointer w-full"
              @click="deleteVaccine(vaccine.id)"
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
      placeholder="Enter Vaccine Name"
      @submit="createVaccine"
      @close="closeModal"
  />
</template>

<script>
import axios from "axios";
import ReusableModal from "@/components/ReusableModal.vue"; // Adjust path as needed

export default {
  name: "VetTreatmentTable",
  components: {
    ReusableModal,
  },
  data() {
    return {
      isModalOpen: false, // Tracks modal visibility
      modalInputValue: "", // Input value for the vaccine name
      vaccineTypes: [], // Initial vaccine types data
    };
  },
  mounted() {
    const vaccineTypesFromStorage = localStorage.getItem('vaccine_types');
    this.vaccineTypes = vaccineTypesFromStorage ? JSON.parse(vaccineTypesFromStorage) : [];

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

    // Handles the vaccine creation
    // When the user submits the form, this function is triggered with the vaccine name.
    async createVaccine(vaccineName) {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem("bearer_token");

      try {
        const response = await axios.post(
            `${url}/api/vets/create_new_vaccine`,
            { name: vaccineName },
            {
              headers: {
                Authorization: `Bearer ${bearer}`,
              },
            }
        );
        console.log(response);
        alert("Vaccine added successfully!");

        // Update the vaccine_types in localStorage or state to reflect the change
        let currentVaccineTypes = JSON.parse(localStorage.getItem('vaccine_types')) || [];
        currentVaccineTypes.push(response.data.vaccine); // Assuming the response contains the newly added vaccine

        localStorage.setItem('vaccine_types', JSON.stringify(currentVaccineTypes));

        // Re-render or refresh the vaccine list by updating the state
        this.vaccineTypes = currentVaccineTypes; // This will trigger reactivity and update the table
      } catch (err) {
        console.log("API Request Error", err);
        alert("Failed to add vaccine.");
      }
    },

    // Handles vaccine deletion
    // Deletes the vaccine type by calling the API and then updating the local storage
    async deleteVaccine(vaccineId) {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');

      try {
        const response = await axios.delete(`${url}/api/vets/delete_vaccine/${vaccineId}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });

        console.log(response);

        // Remove the deleted vaccine type from localStorage and update the UI reactively
        let vaccineTypes = JSON.parse(localStorage.getItem('vaccine_types')) || [];
        vaccineTypes = vaccineTypes.filter(vaccine => vaccine.id !== vaccineId); // Remove the deleted vaccine

        localStorage.setItem('vaccine_types', JSON.stringify(vaccineTypes));

        // Re-render or refresh the vaccine list by updating the state
        this.vaccineTypes = vaccineTypes; // This will trigger reactivity and update the table
      } catch (err) {
        console.log('API request Failed', err);
      }
    },
  },
};
</script>

<style scoped>
/* Add any styles if needed */
</style>
