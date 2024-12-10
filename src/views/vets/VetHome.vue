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
            {{ user.pets ? user.pets.length : 0  }}
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import ReusableModal from "@/components/ReusableModal.vue";

export default {
  name: "VetHome",
  // eslint-disable-next-line vue/no-unused-components
  components: {ReusableModal},
  data() {
    return {
      users: [],
      pets: [],
      vaccine_types_array: [],
      pet_types_array: [],
      isTreatmentModalOpen: false,
      isSpeciesModalOpen: false,
    };
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
      this.$router.push({name: "PetsView", params: {userId}});
    },



  },
};
</script>

<style scoped>
/* Add styles if necessary */
</style>
