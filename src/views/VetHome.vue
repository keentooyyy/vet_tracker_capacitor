<template>
  <div>
    <h1 class="text-2xl font-bold my-5"> All Users Pets with its registered pets</h1>

    <div class="overflow-x-auto">
      <table>
        <thead>
        <tr>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">First Name</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Last Name</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Email</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">No. Registered Pets</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id" class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" @click="userClicked(user.id)">
            {{ user.first_name }}
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" @click="userClicked(user.id)">
            {{ user.last_name }}
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" @click="userClicked(user.id)">
            {{ user.email }}
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" @click="userClicked(user.id)">
            {{ user.pets.length }}
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Treatments Section -->
      <div class="flex mt-10 gap-12 w-full">
        <h1 class="text-2xl font-bold">Treatments</h1>
        <button class="bg-[var(--main-color)] px-3 rounded-md text-white text-sm cursor-pointer"
                @click="openTreatmentModal">Add New Treatment</button>
      </div>
      <table class="mt-5">
        <thead>
        <tr>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Treatment types</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Action</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="vaccine_type in vaccine_types_array" :key="vaccine_type.id" class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ vaccine_type.name }}</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            <button class="bg-red-800 py-3 px-2 rounded-md text-white text-sm cursor-pointer w-full"
                    @click="deleteVaccine(vaccine_type.id)"> Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Species Section -->
      <div class="flex mt-10 gap-12 w-full">
        <h1 class="text-2xl font-bold">Species</h1>
        <button class="bg-[var(--main-color)] px-3 rounded-md text-white text-sm cursor-pointer"
                @click="openSpeciesModal">Add New Species</button>
      </div>
      <table class="mt-5">
        <thead>
        <tr>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Species Types</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Action</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="pet_type in pet_types_array" :key="pet_type.id" class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ pet_type.type }}</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            <button class="bg-red-800 py-3 px-2 rounded-md text-white text-sm cursor-pointer w-full"
                    @click="deleteSpecies(pet_type.id)"> Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Reusable Modal -->
    <ReusableModal
        :isOpen="isTreatmentModalOpen"
        placeholder="Enter new treatment name"
        @submit="createTreatment"
        @close="closeTreatmentModal"
    />
    <ReusableModal
        :isOpen="isSpeciesModalOpen"
        placeholder="Enter new species name"
        @submit="createSpecies"
        @close="closeSpeciesModal"
    />
  </div>
</template>

<script>
import axios from "axios";
import ReusableModal from "@/components/ReusableModal.vue";

export default {
  name: "VetHome",
  components: {ReusableModal},
  data() {
    return {
      users: [],
      vaccine_types_array: [],
      pet_types_array: [],
      isTreatmentModalOpen: false,
      isSpeciesModalOpen: false,
    };
  },
  created() {
    this.getAllPetsAndUsers();
    this.getVaccineTypes();
    this.getPetTypes();
  },
  methods: {
    async getAllPetsAndUsers() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem("bearer_token");

      try {
        const response = await axios.get(`${url}/api/vets/get_all_pet_user`, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        });
        this.users = response.data.users;
      } catch (err) {
        console.log("API request Failed", err);
        localStorage.clear();
        this.$router.push("/");
      }
    },
    async getVaccineTypes() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem("bearer_token");

      try {
        const response = await axios.get(`${url}/api/get_vaccines`, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        });

        this.vaccine_types_array = response.data.vaccines;
      } catch (err) {
        console.log("API Request Error", err);
      }
    },
    async getPetTypes() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem("bearer_token");

      try {
        const response = await axios.get(`${url}/api/get_pet_type`, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        });

        this.pet_types_array = response.data.types;
      } catch (err) {
        console.log("API Request Error", err);
      }
    },
    openTreatmentModal() {
      this.isTreatmentModalOpen = true;
    },
    closeTreatmentModal() {
      this.isTreatmentModalOpen = false;
    },
    async createTreatment(treatmentName) {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem("bearer_token");

      try {
        await axios.post(
            `${url}/api/vets/create_new_vaccine`,
            {name: treatmentName},
            {
              headers: {
                Authorization: `Bearer ${bearer}`,
              },
            }
        );
        await this.getVaccineTypes(); // Refresh list
      } catch (err) {
        console.log("API Request Error", err);
      }
    },
    openSpeciesModal() {
      this.isSpeciesModalOpen = true;
    },
    closeSpeciesModal() {
      this.isSpeciesModalOpen = false;
    },
    async createSpecies(speciesName) {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem("bearer_token");

      try {
        const response = await axios.post(
            `${url}/api/vets/create_species`,
            { type: speciesName }, // Adjusted data structure
            {
              headers: {
                Authorization: `Bearer ${bearer}`,
              },
            }
        );
        await this.getPetTypes(); // Refresh list of species
        console.log("Species created successfully:", response.data);
      } catch (err) {
        console.log("API Request Error while creating species:", err);
      }
    },
    async deleteVaccine(vaccineId) {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem("bearer_token");

      try {
        await axios.delete(`${url}/api/vets/delete_vaccine/${vaccineId}`, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        });
        await this.getVaccineTypes(); // Refresh list
      } catch (err) {
        console.log("API request Failed", err);
      }
    },
    async deleteSpecies(speciesId) {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem("bearer_token");

      try {
        await axios.delete(`${url}/api/vets/delete_species/${speciesId}`, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        });
        await this.getPetTypes(); // Refresh list
      } catch (err) {
        console.log("API request Failed", err);
      }
    },
    userClicked(userId) {
      this.$router.push({name: "PetsView", params: {userId}});
    },
  },
};
</script>

<style scoped>
/* Add styles if necessary */
</style>
