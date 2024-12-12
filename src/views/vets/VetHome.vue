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
      <table>
        <thead>
        <tr>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">First Name</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Last Name</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Address</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">No. Registered Pets</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in filteredUsers" :key="user.id" class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" @click="userClicked(user.id)">
            {{ user.first_name }}
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" @click="userClicked(user.id)">
            {{ user.last_name }}
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" @click="userClicked(user.id)">
            {{ user.street }} st., brgy. {{user.brgy}}, {{user.city}} City
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" @click="userClicked(user.id)">
            {{ user.pets ? user.pets.length : 0  }}
          </td>
        </tr>
        </tbody>
      </table>

    </div>

    <VetTreatmentTable/>
    <VetSpeciesTable/>
  </div>
</template>

<script>
import axios from "axios";
import ReusableModal from "@/components/ReusableModal.vue";
import VetTreatmentTable from "@/components/VetTreatmentTable.vue";
import VetSpeciesTable from "@/components/VetSpeciesTable.vue";

export default {
  name: "VetHome",
  // eslint-disable-next-line vue/no-unused-components
  components: {VetSpeciesTable, VetTreatmentTable, ReusableModal},
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
