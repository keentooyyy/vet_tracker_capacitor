<template>
  <div class="w-11/12 mx-auto">
    <h1 class="text-2xl font-bold my-5"> All Users Pets with its registered pets</h1>
    <!-- SEARCH BOX -->
    <div class="my-4">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by First Name, Last Name, or Email"
          class="w-full p-2 border border-gray-300 rounded"
      />
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
        <tr>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">First Name</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Last Name</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Address</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">No. Registered Pets</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Action</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in filteredUsers" :key="user.id" class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            {{ user.first_name }}
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            {{ user.last_name }}
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            {{ user.street }} st., brgy. {{user.brgy}}, {{user.city}} City
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            {{ user.pets ? user.pets.length : 0  }}
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" >
            <button @click="userClicked(user.id)"
                class="bg-[var(--main-color)] py-3 px-2 rounded-md text-white text-sm cursor-pointer w-full"
            >
              View
            </button>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
    <VetStatisticsView/>
    <VetVaccinationReports/>

    <VetTreatmentTable/>
    <VetSpeciesTable/>
  </div>
</template>

<script>
import axios from "axios";
import ReusableModal from "@/components/ReusableModal.vue";
import VetTreatmentTable from "@/views/vets/VetTreatmentTable.vue";
import VetSpeciesTable from "@/views/vets/VetSpeciesTable.vue";
import VetStatisticsView from "@/views/vets/VetStatisticsView.vue";
import VetVaccinationReports from "@/views/vets/VetVaccinationReports.vue";

export default {
  name: "VetHome",
  // eslint-disable-next-line vue/no-unused-components
  components: {VetVaccinationReports, VetStatisticsView, VetSpeciesTable, VetTreatmentTable, ReusableModal},
  data() {
    return {
      users: [],
      pets: [],
      vaccine_types_array: [],
      pet_types_array: [],


      searchQuery: "",

    };
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery.trim()) {
        return this.users;
      }
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(
          (user) =>
              user.first_name.toLowerCase().includes(query) ||
              user.last_name.toLowerCase().includes(query) ||
              user.email.toLowerCase().includes(query)
      );
    },
  },
  mounted() {
    this.getAllPetsAndUsers();
    this.populateVaccineTypes();
    this.populatePetTypes();
    // this.populateUsers();
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
        // console.log(response.data.vets)
        this.users = response.data.users; // Make sure you store the vets
        localStorage.setItem('user_accounts', JSON.stringify(this.users));
      } catch (err) {
        console.log("API request Failed", err);
        // localStorage.clear();
        // this.$router.push("/");
      }
    },
    async populateVaccineTypes() {
      this.vaccine_types_array = JSON.parse(localStorage.getItem('vaccine_types'))
    },
    async populatePetTypes() {
      this.pet_types_array = JSON.parse(localStorage.getItem('pet_types'))
    },
    // async populateUsers() {
    //   this.vets = JSON.parse(localStorage.getItem('pet_types'))
    // },
    userClicked(userId) {
      this.$router.push(`/dashboard/pets/${userId}`);
    },



  },
};
</script>

<style scoped>
/* Add styles if necessary */
</style>
